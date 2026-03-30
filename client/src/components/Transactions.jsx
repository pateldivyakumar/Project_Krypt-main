import React, { useContext, useEffect, useState } from "react";

import { TransactionContext } from "../context/TransactionContext";

import { shortenAddress } from "../utils/shortenAddress";

const TransactionsCard = ({ addressTo, addressFrom, timestamp, message, keyword, amount, url, id, hash }) => {
  const [gifUrl, setGifUrl] = useState("");
  const isDummyData = id ? true : false; // Dummy data has id property
  const isSepoliaTransaction = hash && !isDummyData;

  // Fetch GIF directly in component
  useEffect(() => {
    const fetchGif = async () => {
      if (url) {
        // Use stored URL if available
        setGifUrl(url);
        return;
      }

      if (!keyword) {
        setGifUrl("https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284");
        return;
      }

      try {
        const APIKEY = "NqW8FpwscU4SPux4caQuqZmRI2vfvirl";
        const cleanKeyword = keyword.trim().toLowerCase().replace(/\s+/g, "");
        
        console.log(`🔍 Fetching GIF for transaction keyword: "${keyword}"`);
        
        const response = await fetch(
          `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&q=${encodeURIComponent(cleanKeyword)}&limit=5&rating=g&lang=en`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const { data } = await response.json();
        console.log(`📊 Found ${data.length} GIFs for "${keyword}"`);

        if (data && data.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.length);
          const selectedGif = data[randomIndex];
          const fetchedGifUrl = selectedGif?.images?.downsized_medium?.url;
          
          if (fetchedGifUrl) {
            setGifUrl(fetchedGifUrl);
            console.log(`✅ Transaction GIF loaded: ${fetchedGifUrl}`);
          } else {
            throw new Error("Invalid GIF data");
          }
        } else {
          throw new Error("No GIFs found");
        }
      } catch (error) {
        console.error(`❌ Error fetching GIF for "${keyword}":`, error);
        setGifUrl("https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284");
      }
    };

    fetchGif();
  }, [keyword, url]);

  // Determine which image URL to use
  const imageUrl = gifUrl || "https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284";
  
  console.log(`TransactionCard - Keyword: "${keyword}", Stored URL: "${url}", Final Image: "${imageUrl}"`);

  const getExplorerLink = (address, type = 'address') => {
    if (isDummyData) return '#';
    return `https://sepolia.etherscan.io/${type}/${address}`;
  };

  return (
    <div className="bg-[#181918] m-4 flex flex-1
      2xl:min-w-[450px]
      2xl:max-w-[500px]
      sm:min-w-[270px]
      sm:max-w-[300px]
      min-w-full
      flex-col p-3 rounded-md hover:shadow-2xl relative"
    >
      {/* Badge for transaction type */}
      {isDummyData ? (
        <div className="absolute top-2 right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full">
          Demo
        </div>
      ) : (
        <div className="absolute top-2 right-2 bg-gradient-to-r from-green-500 to-blue-500 text-white text-xs px-2 py-1 rounded-full">
          ✅ Real
        </div>
      )}
      
      <div className="flex flex-col items-center w-full mt-3">
        <div className="display-flex justify-start w-full mb-6 p-2">
          <a 
            href={getExplorerLink(addressFrom)} 
            target="_blank" 
            rel="noreferrer"
            className={isDummyData ? "cursor-default" : "hover:text-blue-400 transition-colors"}
          >
            <p className="text-white text-base">From: {shortenAddress(addressFrom)}</p>
          </a>
          <a 
            href={getExplorerLink(addressTo)} 
            target="_blank" 
            rel="noreferrer"
            className={isDummyData ? "cursor-default" : "hover:text-blue-400 transition-colors"}
          >
            <p className="text-white text-base">To: {shortenAddress(addressTo)}</p>
          </a>
          <p className="text-white text-base">
            Amount: <span className="text-green-400 font-semibold">{amount} ETH</span>
          </p>
          {message && (
            <>
              <br />
              <p className="text-white text-base">Message: <span className="text-gray-300 italic">{message}</span></p>
            </>
          )}
          {hash && (
            <>
              <br />
              <a 
                href={getExplorerLink(hash, 'tx')} 
                target="_blank" 
                rel="noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors text-sm"
              >
                View on Etherscan: {shortenAddress(hash)}
              </a>
            </>
          )}
        </div>
        <img
          src={imageUrl}
          alt="transaction gif"
          className="w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover"
          onLoad={() => console.log(`Image loaded successfully: ${imageUrl}`)}
          onError={(e) => {
            console.log(`Image failed to load: ${imageUrl}`);
            e.target.src = "https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284";
          }}
        />
        <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
          <p className="text-[#37c7da] font-bold">{timestamp}</p>
        </div>
      </div>
    </div>
  );
};

const Transactions = () => {
  const { transactions, currentAccount } = useContext(TransactionContext);

  const realTransactions = transactions.filter(tx => !tx.id);
  const hasRealTransactions = realTransactions.length > 0;

  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4">
        <h3 className="text-white text-3xl text-center my-2">
          Transaction History
        </h3>
        
        {!currentAccount && (
          <p className="text-white text-center mb-4 opacity-75">
            Connect your wallet to send new transactions
          </p>
        )}

        {/* Transaction Stats */}
        {hasRealTransactions && (
          <div className="flex justify-center mb-6">
            <div className="text-center">
              <p className="text-green-400 text-2xl font-bold">{realTransactions.length}</p>
              <p className="text-gray-400 text-sm">Your Transactions</p>
            </div>
          </div>
        )}        {/* Real Transactions Section */}
        {hasRealTransactions && (
          <div className="mb-8">
            <h4 className="text-green-400 text-xl text-center mb-4 flex items-center justify-center">
              <span className="mr-2">✅</span>
              Your Transactions
            </h4>
            <div className="flex flex-wrap justify-center items-center">
              {realTransactions.reverse().map((transaction, i) => (
                <TransactionsCard key={`real-${i}`} {...transaction} />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!hasRealTransactions && currentAccount && (
          <div className="text-center mt-8 p-6 bg-gray-800/30 rounded-lg border border-gray-600">
            <p className="text-gray-400 text-lg mb-2">No transactions yet</p>
            <p className="text-gray-500 text-sm">
              Send your first transaction using the form above!<br/>
              Your completed transactions will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transactions;