import React, { useState, useEffect } from 'react';
import { alchemyUtils, formatEther } from '../utils/alchemy';

const NetworkStatus = ({ currentAccount }) => {
  const [networkInfo, setNetworkInfo] = useState({
    latestBlock: null,
    balance: null,
    gasPrice: null,
    loading: true
  });

  useEffect(() => {
    const fetchNetworkInfo = async () => {
      try {
        setNetworkInfo(prev => ({ ...prev, loading: true }));
        
        // Get latest block
        const latestBlock = await alchemyUtils.getLatestBlock();
        
        // Get gas price
        const gasPrice = await alchemyUtils.getGasPrice();
        
        let balance = null;
        if (currentAccount) {
          // Get account balance if wallet is connected
          const balanceWei = await alchemyUtils.getBalance(currentAccount);
          balance = formatEther(balanceWei);
        }
        
        setNetworkInfo({
          latestBlock: Number(latestBlock.number),
          balance,
          gasPrice: formatEther(gasPrice),
          loading: false
        });
        
      } catch (error) {
        console.error('Error fetching network info:', error);
        setNetworkInfo(prev => ({ ...prev, loading: false }));
      }
    };

    fetchNetworkInfo();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchNetworkInfo, 30000);
    
    return () => clearInterval(interval);
  }, [currentAccount]);

  if (networkInfo.loading) {
    return (
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
        <h3 className="text-white text-lg font-semibold mb-2">Sepolia Network Status</h3>
        <p className="text-gray-400">Loading network information...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
      <h3 className="text-white text-lg font-semibold mb-4 flex items-center">
        🌐 Sepolia Network Status
        <span className="ml-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="bg-gray-700 p-3 rounded">
          <p className="text-gray-400 mb-1">Latest Block</p>
          <p className="text-white font-mono">#{networkInfo.latestBlock?.toLocaleString()}</p>
        </div>
        
        <div className="bg-gray-700 p-3 rounded">
          <p className="text-gray-400 mb-1">Gas Price</p>
          <p className="text-white font-mono">{networkInfo.gasPrice} ETH</p>
        </div>
        
        {currentAccount && networkInfo.balance && (
          <div className="bg-gray-700 p-3 rounded">
            <p className="text-gray-400 mb-1">Your Balance</p>
            <p className="text-white font-mono">{networkInfo.balance} SepoliaETH</p>
          </div>
        )}
      </div>
      
      <div className="mt-4 text-xs text-gray-400">
        <p>🔄 Auto-refreshes every 30 seconds</p>
      </div>
    </div>
  );
};

export default NetworkStatus;
