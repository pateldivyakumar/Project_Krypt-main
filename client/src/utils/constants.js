import abi from './Transactions.json'
export const contractABI=abi.abi;

// Sepolia Testnet Contract Address
export const contractAddress='0x13dF5fA7932D219C03c3e3ddaAD0701Ba116b48F';

// Alchemy API Configuration
export const ALCHEMY_API_KEY = 'gliEi3veBT7BE_ddKXU8J';
export const SEPOLIA_RPC_URL = `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;

// Network Configuration for Sepolia
export const SEPOLIA_NETWORK = {
  chainId: '0xaa36a7', // 11155111 in hex
  chainName: 'Sepolia test network',
  nativeCurrency: {
    name: 'SepoliaETH',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: [SEPOLIA_RPC_URL],
  blockExplorerUrls: ['https://sepolia.etherscan.io'],
};
