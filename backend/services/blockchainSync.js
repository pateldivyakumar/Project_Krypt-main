import { ethers } from 'ethers';
import { TransactionModel } from '../models/Transaction.js';
import dotenv from 'dotenv';

dotenv.config();

// Contract ABI (from your existing constants.js)
const contractABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "message",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "keyword",
        "type": "string"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "getAllTransactions",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "sender",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "receiver",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "message",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "keyword",
            "type": "string"
          }
        ],
        "internalType": "struct Transactions.TransferStruct[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

export class BlockchainSyncService {
  constructor() {
    this.provider = new ethers.JsonRpcProvider(process.env.ETHEREUM_RPC_URL);
    this.contractAddress = process.env.CONTRACT_ADDRESS;
    this.contract = new ethers.Contract(this.contractAddress, contractABI, this.provider);
  }

  // Fetch GIF URL from Giphy API
  async fetchGifUrl(keyword) {
    try {
      if (!keyword || !process.env.GIPHY_API_KEY) return null;
      
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${keyword.split(" ").join("")}&limit=1`
      );
      const data = await response.json();
      return data.data[0]?.images?.downsized_medium?.url || null;
    } catch (error) {
      console.error('Error fetching GIF:', error);
      return null;
    }
  }

  // Sync all transactions from blockchain to database
  async syncAllTransactions() {
    try {
      console.log('🔄 Starting blockchain sync...');
      
      // Get all transactions from smart contract
      const blockchainTransactions = await this.contract.getAllTransactions();
      console.log(`📦 Found ${blockchainTransactions.length} transactions on blockchain`);

      let syncedCount = 0;
      let skippedCount = 0;

      for (const tx of blockchainTransactions) {
        try {
          // Create a unique hash for blockchain transactions (since we don't have actual tx hash)
          const transactionHash = ethers.keccak256(
            ethers.toUtf8Bytes(`${tx.sender}-${tx.receiver}-${tx.amount}-${tx.timestamp}`)
          );

          // Check if transaction already exists
          const existingTx = await TransactionModel.getByHash(transactionHash);
          if (existingTx) {
            skippedCount++;
            continue;
          }

          // Fetch GIF URL
          const gifUrl = await this.fetchGifUrl(tx.keyword);

          // Convert blockchain data to database format
          const transactionData = {
            transactionHash,
            blockNumber: null, // We don't have block number from contract call
            fromAddress: tx.sender.toLowerCase(),
            toAddress: tx.receiver.toLowerCase(),
            amount: ethers.formatEther(tx.amount),
            message: tx.message,
            keyword: tx.keyword,
            gifUrl,
            timestamp: new Date(Number(tx.timestamp) * 1000),
            blockchainTimestamp: Number(tx.timestamp)
          };

          await TransactionModel.create(transactionData);
          syncedCount++;

          // Add small delay to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 100));

        } catch (error) {
          console.error('Error syncing transaction:', error);
        }
      }

      console.log(`✅ Sync complete: ${syncedCount} new transactions, ${skippedCount} skipped`);
      return { syncedCount, skippedCount, total: blockchainTransactions.length };

    } catch (error) {
      console.error('❌ Error syncing blockchain transactions:', error);
      throw error;
    }
  }

  // Listen for new Transfer events and sync them
  async startEventListener() {
    try {
      console.log('👂 Starting blockchain event listener...');
      
      this.contract.on('Transfer', async (from, receiver, amount, message, timestamp, keyword, event) => {
        try {
          console.log('🔔 New Transfer event detected:', {
            from,
            receiver,
            amount: ethers.formatEther(amount),
            message,
            keyword
          });

          // Get transaction hash from event
          const transactionHash = event.transactionHash;

          // Check if already processed
          const existingTx = await TransactionModel.getByHash(transactionHash);
          if (existingTx) {
            console.log('⏭️  Transaction already exists, skipping');
            return;
          }

          // Fetch GIF URL
          const gifUrl = await this.fetchGifUrl(keyword);

          // Get block number
          const blockNumber = event.blockNumber;

          const transactionData = {
            transactionHash,
            blockNumber,
            fromAddress: from.toLowerCase(),
            toAddress: receiver.toLowerCase(),
            amount: ethers.formatEther(amount),
            message,
            keyword,
            gifUrl,
            timestamp: new Date(Number(timestamp) * 1000),
            blockchainTimestamp: Number(timestamp)
          };

          await TransactionModel.create(transactionData);
          console.log('💾 Transaction saved to database');

        } catch (error) {
          console.error('Error processing Transfer event:', error);
        }
      });

      console.log('✅ Event listener started successfully');

    } catch (error) {
      console.error('❌ Error starting event listener:', error);
      throw error;
    }
  }

  // Stop event listener
  stopEventListener() {
    this.contract.removeAllListeners('Transfer');
    console.log('🛑 Event listener stopped');
  }

  // Sync specific transaction by hash
  async syncTransactionByHash(txHash) {
    try {
      const receipt = await this.provider.getTransactionReceipt(txHash);
      if (!receipt) {
        throw new Error('Transaction not found');
      }

      // Parse logs to find Transfer events
      const logs = receipt.logs;
      const transferLogs = logs.filter(log => 
        log.address.toLowerCase() === this.contractAddress.toLowerCase()
      );

      for (const log of transferLogs) {
        try {
          const parsedLog = this.contract.interface.parseLog(log);
          if (parsedLog.name === 'Transfer') {
            const { from, receiver, amount, message, timestamp, keyword } = parsedLog.args;

            // Fetch GIF URL
            const gifUrl = await this.fetchGifUrl(keyword);

            const transactionData = {
              transactionHash: txHash,
              blockNumber: receipt.blockNumber,
              fromAddress: from.toLowerCase(),
              toAddress: receiver.toLowerCase(),
              amount: ethers.formatEther(amount),
              message,
              keyword,
              gifUrl,
              timestamp: new Date(Number(timestamp) * 1000),
              blockchainTimestamp: Number(timestamp)
            };

            const savedTx = await TransactionModel.create(transactionData);
            console.log('Transaction synced:', savedTx);
            return savedTx;
          }
        } catch (parseError) {
          console.error('Error parsing log:', parseError);
        }
      }

    } catch (error) {
      console.error('Error syncing transaction by hash:', error);
      throw error;
    }
  }
}
