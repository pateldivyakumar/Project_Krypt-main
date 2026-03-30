// Alchemy Integration using Viem for Sepolia testnet
import { createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";
import { ALCHEMY_API_KEY, SEPOLIA_RPC_URL } from "./constants";

// Create Viem client for Sepolia with Alchemy
export const alchemyClient = createPublicClient({
  chain: sepolia,
  transport: http(SEPOLIA_RPC_URL),
});

// Utility functions using Alchemy
export const alchemyUtils = {
  // Get latest block
  async getLatestBlock() {
    try {
      const block = await alchemyClient.getBlock();
      return block;
    } catch (error) {
      console.error('Error fetching latest block:', error);
      throw error;
    }
  },

  // Get specific block by number
  async getBlock(blockNumber) {
    try {
      const block = await alchemyClient.getBlock({
        blockNumber: BigInt(blockNumber),
      });
      return block;
    } catch (error) {
      console.error('Error fetching block:', error);
      throw error;
    }
  },

  // Get account balance
  async getBalance(address) {
    try {
      const balance = await alchemyClient.getBalance({
        address: address,
      });
      return balance;
    } catch (error) {
      console.error('Error fetching balance:', error);
      throw error;
    }
  },

  // Get transaction by hash
  async getTransaction(hash) {
    try {
      const transaction = await alchemyClient.getTransaction({
        hash: hash,
      });
      return transaction;
    } catch (error) {
      console.error('Error fetching transaction:', error);
      throw error;
    }
  },

  // Get transaction receipt
  async getTransactionReceipt(hash) {
    try {
      const receipt = await alchemyClient.getTransactionReceipt({
        hash: hash,
      });
      return receipt;
    } catch (error) {
      console.error('Error fetching transaction receipt:', error);
      throw error;
    }
  },

  // Wait for transaction confirmation
  async waitForTransaction(hash) {
    try {
      const receipt = await alchemyClient.waitForTransactionReceipt({
        hash: hash,
      });
      return receipt;
    } catch (error) {
      console.error('Error waiting for transaction:', error);
      throw error;
    }
  },

  // Get gas price
  async getGasPrice() {
    try {
      const gasPrice = await alchemyClient.getGasPrice();
      return gasPrice;
    } catch (error) {
      console.error('Error fetching gas price:', error);
      throw error;
    }
  },

  // Estimate gas for transaction
  async estimateGas(transaction) {
    try {
      const gasEstimate = await alchemyClient.estimateGas(transaction);
      return gasEstimate;
    } catch (error) {
      console.error('Error estimating gas:', error);
      throw error;
    }
  }
};

// Network information
export const sepoliaNetworkInfo = {
  name: sepolia.name,
  id: sepolia.id,
  nativeCurrency: sepolia.nativeCurrency,
  rpcUrls: sepolia.rpcUrls,
  blockExplorers: sepolia.blockExplorers,
  testnet: sepolia.testnet
};

// Helper function to format ETH amounts
export const formatEther = (wei) => {
  return (Number(wei) / 1e18).toFixed(6);
};

// Helper function to parse ETH amounts to wei
export const parseEther = (ether) => {
  return BigInt(Math.floor(parseFloat(ether) * 1e18));
};

export default alchemyClient;
