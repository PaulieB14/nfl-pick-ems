require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.23",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    // Local testing
    hardhat: {
      chainId: 31337,
    },
    // Base Sepolia testnet (as per Base docs)
    'base-sepolia': {
      url: 'https://sepolia.base.org',
      accounts: process.env.WALLET_KEY ? [process.env.WALLET_KEY] : [],
      gasPrice: 1000000000,
      chainId: 84532,
    },
    // Base mainnet (for final deployment)
    'base-mainnet': {
      url: 'https://mainnet.base.org',
      accounts: process.env.WALLET_KEY ? [process.env.WALLET_KEY] : [],
      gasPrice: 1000000000,
      chainId: 8453,
    },
  },
  etherscan: {
    apiKey: {
      "base-sepolia": process.env.BASESCAN_API_KEY || "PLACEHOLDER_STRING",
      "base-mainnet": process.env.BASESCAN_API_KEY || "PLACEHOLDER_STRING",
    },
    customChains: [
      {
        network: "base-sepolia",
        chainId: 84532,
        urls: {
          apiURL: "https://api-sepolia.basescan.org/api",
          browserURL: "https://sepolia.basescan.org",
        },
      },
      {
        network: "base-mainnet",
        chainId: 8453,
        urls: {
          apiURL: "https://api.basescan.org/api",
          browserURL: "https://basescan.org",
        },
      },
    ],
  },
  defaultNetwork: 'hardhat',
};
