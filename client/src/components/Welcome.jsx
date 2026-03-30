import React, { useContext, useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";
import { getCryptoKeywords, getRandomKeywords } from "../utils/gifKeywords";
import { Loader } from ".";

const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Input = ({ placeholder, name, type, value, handleChange }) => {
  const handleInputChange = (e) => {
    // Special handling for amount field
    if (name === "amount") {
      const inputValue = e.target.value;
      // Allow only numbers and decimal point
      if (inputValue === "" || /^\d*\.?\d*$/.test(inputValue)) {
        // Limit to 6 decimal places
        const parts = inputValue.split('.');
        if (parts[1] && parts[1].length > 6) {
          return; // Don't update if more than 6 decimal places
        }
        handleChange(e, name);
      }
    } else {
      handleChange(e, name);
    }
  };

  return (
    <input
      placeholder={placeholder}
      type={type}
      step="0.000001"
      min={name === "amount" ? "0.000001" : undefined}
      max={name === "amount" ? "1000" : undefined}
      value={value}
      onChange={handleInputChange}
      className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
    />
  );
};

const Welcome = () => {
  const { currentAccount, connectWallet, handleChange, sendTransaction, formData, isLoading, networkError, switchToSepolia } = useContext(TransactionContext);
  const [showKeywordSuggestions, setShowKeywordSuggestions] = useState(false);

  const cryptoKeywords = getCryptoKeywords();
  const popularKeywords = getRandomKeywords(8);

  const handleKeywordClick = (keyword) => {
    handleChange({ target: { value: keyword } }, "keyword");
    setShowKeywordSuggestions(false);
  };

  const handleSubmit = (e) => {
    const { addressTo, amount, keyword, message } = formData;

    e.preventDefault();

    if (!addressTo || !amount || !keyword || !message) {
      alert("Please fill in all fields");
      return;
    }

    // Validate amount
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      alert("Please enter a valid amount greater than 0");
      return;
    }

    if (numAmount < 0.000001) {
      alert("Minimum amount is 0.000001 ETH");
      return;
    }

    if (numAmount > 1000) {
      alert("Maximum amount is 1000 ETH");
      return;
    }

    // Validate Ethereum address format
    if (!addressTo.match(/^0x[a-fA-F0-9]{40}$/)) {
      alert("Please enter a valid Ethereum address (starts with 0x and 40 characters long)");
      return;
    }

    // Check if user is trying to send to their own address
    if (addressTo.toLowerCase() === currentAccount.toLowerCase()) {
      alert("You cannot send funds to your own address. Please enter a different recipient address.");
      return;
    }

    console.log(`Preparing to send ${amount} ETH from ${shortenAddress(currentAccount)} to ${addressTo}`);
    sendTransaction();
  };

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
            Send Crypto <br /> across the world
          </h1>
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
            Explore the crypto world. Buy and sell cryptocurrencies easily on Quantum Transfer using Sepolia testnet.
          </p>
          
          {/* Network Status Indicator */}
          {currentAccount && (
            <div className="mt-3 p-3 rounded-lg bg-green-900/30 border border-green-500">
              <p className="text-green-400 text-sm">
                ✅ Connected to Sepolia Testnet - Safe for testing with free SepoliaETH
              </p>
            </div>
          )}
          
          {/* Network Error Warning */}
          {networkError && (
            <div className="mt-3 p-3 rounded-lg bg-red-900/30 border border-red-500">
              <p className="text-red-400 text-sm mb-2">⚠️ {networkError}</p>
              <button
                onClick={switchToSepolia}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition duration-200"
              >
                Switch to Sepolia
              </button>
            </div>
          )}
          {!currentAccount && (
            <button
              type="button"
              onClick={connectWallet}
              className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
            >
              <AiFillPlayCircle className="text-white mr-2" />
              <p className="text-white text-base font-semibold">
                Connect Wallet
              </p>
            </button>
          )}

          <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
            <div className={`rounded-tl-2xl ${companyCommonStyles}`}>
              Reliability
            </div>
            <div className={companyCommonStyles}>Security</div>
            <div className={`sm:rounded-tr-2xl ${companyCommonStyles}`}>
              Ethereum
            </div>
            <div className={`sm:rounded-bl-2xl ${companyCommonStyles}`}>
              Web 3.0
            </div>
            <div className={companyCommonStyles}>Low Fees</div>
            <div className={`rounded-br-2xl ${companyCommonStyles}`}>
              Blockchain
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
          <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card .white-glassmorphism ">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                  <SiEthereum fontSize={21} color="#fff" />
                </div>
                <BsInfoCircle fontSize={17} color="#fff" />
              </div>
              <div>
                <p className="text-white font-light text-sm">
                  <span className="text-gray-400">Your Wallet (From):</span>
                </p>
                <p className="text-white font-light text-sm">
                  {shortenAddress(currentAccount)}
                </p>
                <p className="text-white font-semibold text-lg mt-1">
                  Sepolia Testnet
                </p>
              </div>
            </div>
          </div>
          <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
            <Input placeholder="Recipient Address (0x...)" name="addressTo" type="text" handleChange={handleChange} value={formData.addressTo} />
            
            {/* Address Helper */}
            {!formData.addressTo && (
              <p className="text-gray-400 text-xs -mt-1 mb-2 text-left w-full">
                💡 Enter recipient's Ethereum address (42 characters starting with 0x)
              </p>
            )}
            
            {/* Address Validation Feedback */}
            {formData.addressTo && formData.addressTo.length > 0 && (
              <div className="-mt-1 mb-2 w-full">
                {formData.addressTo.match(/^0x[a-fA-F0-9]{40}$/) ? (
                  formData.addressTo.toLowerCase() === currentAccount?.toLowerCase() ? (
                    <p className="text-red-400 text-xs">⚠️ Cannot send to your own address</p>
                  ) : (
                    <p className="text-green-400 text-xs">✅ Valid Ethereum address</p>
                  )
                ) : (
                  <p className="text-yellow-400 text-xs">⚠️ Invalid address format</p>
                )}
              </div>
            )}
            
            <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} value={formData.amount} />
            <Input placeholder="Keyword (Gif)" name="keyword" type="text" handleChange={handleChange} value={formData.keyword} />
            
            {/* GIF Keyword Suggestions */}
            <div className="mt-2">
              <button
                type="button"
                onClick={() => setShowKeywordSuggestions(!showKeywordSuggestions)}
                className="text-xs text-blue-400 hover:text-blue-300 mb-2"
              >
                {showKeywordSuggestions ? 'Hide' : 'Show'} GIF Keyword Suggestions 💡
              </button>
              
              {showKeywordSuggestions && (
                <div className="bg-gray-800 p-3 rounded-lg border border-gray-600">
                  <div className="mb-3">
                    <p className="text-xs text-green-400 mb-2">🚀 Crypto Keywords:</p>
                    <div className="flex flex-wrap gap-1">
                      {cryptoKeywords.slice(0, 6).map((keyword, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleKeywordClick(keyword)}
                          className="px-2 py-1 bg-green-600 hover:bg-green-500 text-white text-xs rounded transition-colors"
                        >
                          {keyword}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-xs text-purple-400 mb-2">🎨 Popular Keywords:</p>
                    <div className="flex flex-wrap gap-1">
                      {popularKeywords.map((keyword, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleKeywordClick(keyword)}
                          className="px-2 py-1 bg-purple-600 hover:bg-purple-500 text-white text-xs rounded transition-colors"
                        >
                          {keyword}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange} value={formData.message} />

            {/* Transaction Preview */}
            {formData.amount && formData.addressTo && currentAccount && (
              <div className="mt-2 p-3 bg-gray-800 rounded-lg border border-gray-600">
                <p className="text-gray-400 text-xs mb-2">Transaction Preview:</p>
                <div className="space-y-1">
                  <p className="text-white text-sm">
                    <span className="text-gray-400">From:</span> <span className="text-blue-400">{shortenAddress(currentAccount)}</span>
                  </p>
                  <p className="text-white text-sm">
                    <span className="text-gray-400">To:</span> <span className="text-blue-400">{shortenAddress(formData.addressTo)}</span>
                  </p>
                  <p className="text-white text-sm">
                    <span className="text-gray-400">Amount:</span> <span className="text-green-400 font-semibold">{formData.amount} SepoliaETH</span>
                  </p>
                  <p className="text-white text-sm">
                    <span className="text-gray-400">Message:</span> <span className="text-gray-300 italic">{formData.message || 'No message'}</span>
                  </p>
                </div>
                <p className="text-yellow-400 text-xs mt-2">
                  ⚠️ Double-check the amount and recipient address before sending
                </p>
              </div>
            )}

            <div className="h-[1px] w-full bg-gray-400 my-2" />

            {isLoading
              ? <Loader />
              : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                >
                  Send now
                </button>
              )}
          </div>
          
          {/* Additional Info */}
          <div className="mt-6 sm:w-96 w-full">
            <div className="text-center text-gray-400 text-sm">
              <p>Make sure MetaMask is connected to Sepolia testnet</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
