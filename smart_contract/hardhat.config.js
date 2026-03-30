
require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-waffle');
require('dotenv').config(); // Add this line

module.exports = {
  solidity: '0.8.0',
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || 'https://eth-sepolia.g.alchemy.com/v2/gliEi3veBT7BE_ddKXU8J', // Updated with your Alchemy API key
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : ['20c9644c331b69e2b64cdfbcbf7ec9774675a8f61227b664df4c7b0b1da43473'], // Use environment variable
    }
  }
};
