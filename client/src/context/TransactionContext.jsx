import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress, SEPOLIA_NETWORK, SEPOLIA_RPC_URL } from "../utils/constants";
import apiService from "../services/apiService";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const createEthereumContract = async () => {
  const provider = new ethers.BrowserProvider(ethereum);
  const signer = await provider.getSigner();
  const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);

  return transactionsContract;
};

// Create read-only contract for fetching data using Alchemy RPC
const createReadOnlyContract = () => {
  const provider = new ethers.JsonRpcProvider(SEPOLIA_RPC_URL);
  const transactionsContract = new ethers.Contract(contractAddress, contractABI, provider);
  
  return transactionsContract;
};

export const TransactionsProvider = ({ children }) => {
  const [formData, setformData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
  const [transactions, setTransactions] = useState([]);
  const [networkError, setNetworkError] = useState("");
  const [transactionStatus, setTransactionStatus] = useState({ message: "", type: "", visible: false });

  const handleChange = (e, name) => {
    const value = e.target.value;
    console.log(`Form field changed: ${name} = ${value}`);
    setformData((prevState) => ({ ...prevState, [name]: value }));
  };

  const showTransactionStatus = (message, type) => {
    setTransactionStatus({ message, type, visible: true });
    // Auto-hide after 5 seconds
    setTimeout(() => {
      setTransactionStatus({ message: "", type: "", visible: false });
    }, 5000);
  };

  const hideTransactionStatus = () => {
    setTransactionStatus({ message: "", type: "", visible: false });
  };

  const checkNetwork = async () => {
    try {
      if (!ethereum) return;
      
      const chainId = await ethereum.request({ method: 'eth_chainId' });
      
      if (chainId !== SEPOLIA_NETWORK.chainId) {
        setNetworkError("Please switch to Sepolia testnet for testing transactions.");
        return false;
      }
      
      setNetworkError("");
      return true;
    } catch (error) {
      console.log("Error checking network:", error);
      return false;
    }
  };

  const switchToSepolia = async () => {
    try {
      if (!ethereum) {
        alert("MetaMask is not installed!");
        return;
      }

      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: SEPOLIA_NETWORK.chainId }],
      });
      
      setNetworkError("");
      console.log("Switched to Sepolia network");
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        try {
          await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [SEPOLIA_NETWORK],
          });
          setNetworkError("");
          console.log("Sepolia network added and switched");
        } catch (addError) {
          console.log("Error adding Sepolia network:", addError);
          setNetworkError("Failed to add Sepolia network. Please add it manually.");
        }
      } else {
        console.log("Error switching to Sepolia:", switchError);
        setNetworkError("Failed to switch to Sepolia network.");
      }
    }
  };

  const getAllTransactions = async () => {
    console.log("🔄 Loading transactions...");
    try {
      // First try to get transactions from database API
      try {
        console.log("📡 Attempting to fetch from API...");
        const response = await apiService.getAllTransactions({ limit: 50 });
        console.log("📊 API Response:", response);
        
        if (response.success && response.data.length > 0) {
          const structuredTransactions = response.data.map((transaction) => ({
            addressTo: transaction.to_address,
            addressFrom: transaction.from_address,
            timestamp: new Date(transaction.timestamp).toLocaleString(),
            message: transaction.message,
            keyword: transaction.keyword,
            amount: parseFloat(transaction.amount),
            url: transaction.gif_url
          }));

          console.log('✅ Transactions loaded from database:', structuredTransactions.length);
          setTransactions(structuredTransactions);
          return;
        } else {
          console.log("⚠️ No transactions from API, trying blockchain...");
        }
      } catch (dbError) {
        console.log('❌ Database fetch failed, falling back to blockchain:', dbError.message);
      }

      // Fallback to blockchain - try MetaMask first, then Alchemy RPC
      let transactionsContract;
      
      if (ethereum && currentAccount) {
        // Use MetaMask if available and connected
        transactionsContract = await createEthereumContract();
      } else {
        // Use Alchemy RPC for read-only access
        console.log('Using Alchemy RPC for transaction data');
        transactionsContract = createReadOnlyContract();
      }

      const availableTransactions = await transactionsContract.getAllTransactions();

      const structuredTransactions = availableTransactions.map((transaction) => ({
        addressTo: transaction.receiver,
        addressFrom: transaction.sender,
        timestamp: new Date(Number(transaction.timestamp) * 1000).toLocaleString(),
        message: transaction.message,
        keyword: transaction.keyword,
        amount: parseFloat(ethers.formatEther(transaction.amount)),
        hash: transaction.hash || null // Include transaction hash if available
      }));

      console.log('Transactions from blockchain (Sepolia):', structuredTransactions);
      setTransactions(structuredTransactions);
    } catch (error) {
      console.log('Error fetching transactions:', error);
    }
  };

  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return;

      // Only check if MetaMask is available, don't auto-connect
      console.log("MetaMask detected, waiting for manual connection");
    } catch (error) {
      console.error("Error checking MetaMask:", error);
    }
  };

  const checkIfTransactionsExists = async () => {
    try {
      let transactionsContract;
      
      if (ethereum && currentAccount) {
        // Use MetaMask if available and connected
        transactionsContract = await createEthereumContract();
      } else {
        // Use Alchemy RPC for read-only access
        transactionsContract = createReadOnlyContract();
      }
      
      const currentTransactionCount = await transactionsContract.getTransactionCount();
      window.localStorage.setItem("transactionCount", currentTransactionCount.toString());
    } catch (error) {
      console.log('Error checking transaction count:', error);
    }
  };

  const connectWallet = async () => {
    console.log("🔌 BUTTON CLICKED - Connect wallet function called!");
    
    try {
      console.log("🔍 Step 1: Checking MetaMask...");
      
      if (!window.ethereum) {
        console.error("❌ MetaMask not found");
        alert("Please install MetaMask!");
        return;
      }
      
      // Step 1: First check current permissions and clear them
      console.log("🧹 Checking existing permissions...");
      
      try {
        const permissions = await window.ethereum.request({
          method: 'wallet_getPermissions',
        });
        console.log("Current permissions:", permissions);
        
        if (permissions.length > 0) {
          console.log("🔄 Revoking existing permissions to force fresh consent...");
          // Note: wallet_revokePermissions is not widely supported yet
          // So we'll use a different approach
        }
      } catch (permError) {
        console.log("Permission check not supported or failed:", permError);
      }
      
      // Step 2: Force explicit permission request using wallet_requestPermissions
      console.log("🔐 Requesting explicit wallet permissions...");
      
      try {
        await window.ethereum.request({
          method: 'wallet_requestPermissions',
          params: [{ eth_accounts: {} }],
        });
        console.log("✅ Permissions granted!");
      } catch (permError) {
        if (permError.code === 4001) {
          console.log("❌ User denied permission request");
          return;
        }
        console.log("Permission request method not supported, falling back...");
      }
      
      // Step 3: Now request accounts (this should show MetaMask popup)
      console.log("📞 Requesting account access...");
      
      const accounts = await window.ethereum.request({ 
        method: "eth_requestAccounts" 
      });
      
      console.log("📋 Accounts received:", accounts);
      
      if (!accounts || accounts.length === 0) {
        console.error("❌ No accounts found");
        return;
      }
      
      // Step 4: Require signature for additional authentication
      console.log("🔐 Requesting signature for authentication...");
      const message = `🔐 Quantum Transfer Authentication\n\nPlease sign this message to confirm your identity and authorize the connection.\n\nWallet: ${accounts[0]}\nTimestamp: ${new Date().toISOString()}\nReason: Wallet Authentication`;
      
      try {
        const signature = await window.ethereum.request({
          method: 'personal_sign',
          params: [message, accounts[0]],
        });
        
        console.log("✅ Authentication signature received:", signature.slice(0, 10) + "...");
      } catch (signError) {
        console.log("❌ User cancelled authentication:", signError);
        return;
      }
      
      // Step 5: Connection successful
      console.log("✅ Setting account:", accounts[0]);
      setCurrentAccount(accounts[0]);
      
      console.log("🎉 SUCCESS: Wallet connected with authentication!");
      
    } catch (error) {
      console.error("❌ ERROR in connectWallet:", error);
      
      if (error.code === 4001) {
        console.log("User rejected connection");
      } else if (error.code === -32002) {
        console.log("Request already pending");
      } else {
        console.log(`Connection failed: ${error.message}`);
      }
    }
  };

  const disconnectWallet = () => {
    setCurrentAccount("");
    // Clear wallet-specific data
    localStorage.removeItem("walletConnected");
    localStorage.removeItem("autoConnectWallet"); // Clean up any existing auto-connect data
    // Clear any wallet-specific transaction data
    setTransactions([]);
    // Reset form data
    setformData({ addressTo: "", amount: "", keyword: "", message: "" });
    console.log("Wallet disconnected successfully");
    
    // Note: To completely reset MetaMask permissions for this site:
    // 1. Open MetaMask
    // 2. Go to Settings > Connections
    // 3. Find your site and click "Disconnect"
    console.log("💡 Tip: To reset MetaMask permissions completely, go to MetaMask Settings > Connections and disconnect this site");
  };

  const sendTransaction = async () => {
    try {
      if (ethereum) {
        // Check network before sending transaction
        const isCorrectNetwork = await checkNetwork();
        if (!isCorrectNetwork) {
          console.log("Please switch to Sepolia testnet before sending transactions.");
          return;
        }

        const { addressTo, amount, keyword, message } = formData;
        
        // Validate inputs
        if (!addressTo || !amount || !keyword || !message) {
          console.log("Please fill in all fields");
          return;
        }

        // Validate amount is a positive number
        const numAmount = parseFloat(amount);
        if (isNaN(numAmount) || numAmount <= 0) {
          console.log("Please enter a valid amount");
          return;
        }

        const transactionsContract = await createEthereumContract();
        const parsedAmount = ethers.parseEther(amount);
        
        // Convert to hex for MetaMask (this fixes the 295.1 bug)
        const hexValue = "0x" + parsedAmount.toString(16);

        console.log(`Sending ${amount} ETH (${parsedAmount.toString()} wei) as hex: ${hexValue}`);
        
        setIsLoading(true);

        // Send the ETH transaction
        const ethTxResponse = await ethereum.request({
          method: "eth_sendTransaction",
          params: [{
            from: currentAccount,
            to: addressTo,
            gas: "0x5208",
            value: hexValue, // Use hex format instead of string
          }],
        });

        // Add to smart contract
        const transactionHash = await transactionsContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

        console.log(`Loading - ${transactionHash.hash}`);
        
        // Wait for confirmation
        const receipt = await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        console.log(`Transaction confirmed in block: ${receipt.blockNumber}`);

        // Fetch GIF URL based on keyword with enhanced search
        let gifUrl = "";
        try {
          const APIKEY = import.meta.env.VITE_GIPHY_API;
          if (APIKEY && keyword) {
            const cleanKeyword = keyword.trim().toLowerCase();
            const searchQuery = cleanKeyword.split(" ").join("");
            
            console.log(`Fetching GIF for transaction keyword: "${keyword}" (cleaned: "${searchQuery}")`);
            
            const response = await fetch(
              `https://api.giphy.com/v1/gifs/search?` +
              `api_key=${APIKEY}&` +
              `q=${encodeURIComponent(searchQuery)}&` +
              `limit=10&` +
              `offset=0&` +
              `rating=g&` +
              `lang=en`
            );
            
            const { data } = await response.json();
            
            if (data && data.length > 0) {
              // Pick a random GIF from the results for variety
              const randomIndex = Math.floor(Math.random() * Math.min(data.length, 5));
              const selectedGif = data[randomIndex];
              gifUrl = selectedGif?.images?.downsized_medium?.url || "";
              console.log(`Selected GIF for transaction (${randomIndex + 1}/${data.length}): ${gifUrl}`);
            } else {
              console.log(`No GIFs found for transaction keyword: "${keyword}"`);
            }
          }
        } catch (gifError) {
          console.log("Failed to fetch GIF for transaction:", gifError);
          gifUrl = "https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284";
        }

        // Save transaction to database
        try {
          const transactionData = {
            transactionHash: transactionHash.hash,
            fromAddress: currentAccount.toLowerCase(),
            toAddress: addressTo.toLowerCase(),
            amount: amount,
            message: message,
            keyword: keyword,
            gifUrl: gifUrl, // Add GIF URL to database
            timestamp: new Date().toISOString(),
            blockchainTimestamp: Math.floor(Date.now() / 1000)
          };

          await apiService.createTransaction(transactionData);
          console.log('Transaction saved to database with GIF URL');
        } catch (dbError) {
          console.error('Failed to save transaction to database:', dbError);
          // Continue even if database save fails
        }

        setIsLoading(false);

        console.log(`✅ Transaction successful! ${amount} ETH sent to ${addressTo.slice(0, 6)}...${addressTo.slice(-4)}. Hash: ${transactionHash.hash.slice(0, 10)}...`);

        const transactionsCount = await transactionsContract.getTransactionCount();
        setTransactionCount(Number(transactionsCount));
        
        // Refresh transactions list
        getAllTransactions();
        
        // Clear form
        setformData({ addressTo: "", amount: "", keyword: "", message: "" });
        
      } else {
        console.log("MetaMask not detected. Please install MetaMask.");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Transaction failed:", error);
      
      let errorMessage = "Transaction failed. ";
      
      if (error.code === 4001) {
        errorMessage += "Transaction was rejected by user.";
      } else if (error.code === -32603) {
        errorMessage += "Internal JSON-RPC error.";
      } else if (error.message?.includes("insufficient funds")) {
        errorMessage += "Insufficient funds for transaction.";
      } else if (error.message?.includes("gas")) {
        errorMessage += "Gas estimation failed.";
      } else {
        errorMessage += error.message || "Unknown error occurred.";
      }
      
      console.log(errorMessage);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnect();
    checkIfTransactionsExists();
    getAllTransactions(); // Load transactions on page load
  }, [transactionCount]);

  return (
    <TransactionContext.Provider
      value={{
        transactionCount,
        connectWallet,
        disconnectWallet,
        transactions,
        currentAccount,
        isLoading,
        sendTransaction,
        handleChange,
        formData,
        networkError,
        switchToSepolia,
        checkNetwork,
        transactionStatus,
        hideTransactionStatus,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};