import React, { useContext } from "react";
import { HiMenuAlt4 } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { FaWallet } from "react-icons/fa";
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);
  const [showWalletMenu, setShowWalletMenu] = React.useState(false);
  const { currentAccount, connectWallet, disconnectWallet, networkError } = useContext(TransactionContext);

  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <h1 className="text-white text-2xl font-bold text-gradient">
          Quantum Transfer
        </h1>
      </div>
      
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {/* Wallet Connection */}
        <li className="relative">
          {!currentAccount ? (
            <button
              type="button"
              onClick={connectWallet}
              className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd] transition duration-200 flex items-center"
            >
              <FaWallet className="mr-2" />
              Connect Wallet
            </button>
          ) : (
            <div className="relative">
              <button
                onClick={() => setShowWalletMenu(!showWalletMenu)}
                className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full text-white hover:bg-[#2546bd] transition duration-200 flex items-center"
              >
                <FaWallet className="mr-2" />
                {shortenAddress(currentAccount)}
              </button>
              
              {/* Wallet Dropdown Menu */}
              {showWalletMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-20">
                  <div className="py-1">
                    <div className="px-4 py-2 text-sm text-gray-300 border-b border-gray-700">
                      <div className="font-medium">Wallet Connected</div>
                      <div className="text-xs text-blue-400">{shortenAddress(currentAccount)}</div>
                      {!networkError && (
                        <div className="text-xs text-green-400 mt-1">✅ Sepolia Testnet</div>
                      )}
                      {networkError && (
                        <div className="text-xs text-red-400 mt-1">⚠️ Wrong Network</div>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(currentAccount);
                        setShowWalletMenu(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                    >
                      📋 Copy Address
                    </button>
                    <button
                      onClick={() => {
                        disconnectWallet();
                        setShowWalletMenu(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 flex items-center"
                    >
                      <FaSignOutAlt className="mr-2" />
                      Disconnect
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </li>
      </ul>
      
      <div className="flex relative">
        {!toggleMenu && (
          <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
        )}
        {toggleMenu && (
          <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2"><AiOutlineClose onClick={() => setToggleMenu(false)} /></li>
            
            {/* Mobile Wallet Connection */}
            <li className="w-full my-4 border-t border-gray-600 pt-4">
              {!currentAccount ? (
                <button
                  type="button"
                  onClick={() => {
                    connectWallet();
                    setToggleMenu(false);
                  }}
                  className="bg-[#2952e3] py-2 px-4 rounded-full cursor-pointer hover:bg-[#2546bd] transition duration-200 w-full flex items-center justify-center"
                >
                  <FaWallet className="mr-2" />
                  Connect Wallet
                </button>
              ) : (
                <div className="space-y-2">
                  <div className="bg-[#2952e3] py-2 px-4 rounded-full text-white text-center flex items-center justify-center">
                    <FaWallet className="mr-2" />
                    {shortenAddress(currentAccount)}
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(currentAccount);
                      setToggleMenu(false);
                    }}
                    className="w-full bg-gray-700 py-2 px-4 rounded-full text-white hover:bg-gray-600 transition duration-200 text-sm"
                  >
                    📋 Copy Address
                  </button>
                  <button
                    onClick={() => {
                      disconnectWallet();
                      setToggleMenu(false);
                    }}
                    className="w-full bg-red-600 py-2 px-4 rounded-full text-white hover:bg-red-700 transition duration-200 text-sm flex items-center justify-center"
                  >
                    <FaSignOutAlt className="mr-2" />
                    Disconnect Wallet
                  </button>
                </div>
              )}
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;