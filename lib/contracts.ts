// NFL Pick 'ems Smart Contract Configuration

export const CONTRACTS = {
  // Base Mainnet (Production)
  mainnet: {
    NFL_PICK_EMS: "0x0b07572EcDcb7709b48Ef1DB11a07d9c263C2e06",
    MOCK_USDC: "0x47A45bdd951E76Ac1A695272e4A7Db5b33c2f468",
    CHAIN_ID: 8453,
    RPC_URL: "https://mainnet.base.org",
    EXPLORER: "https://basescan.org"
  },
  
  // Base Sepolia (Testnet)
  testnet: {
    NFL_PICK_EMS: "0xdaCa068241baF6b7DC2F246304703c9E51B14C42",
    MOCK_USDC: "0xab83D7Da5C2752Bf7AcB5804bF81ac22C7A9034B",
    CHAIN_ID: 84532,
    RPC_URL: "https://sepolia.base.org",
    EXPLORER: "https://sepolia.basescan.org"
  }
};

// Real USDC on Base Mainnet (for production)
export const REAL_USDC = {
  mainnet: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // USDC on Base
  testnet: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"  // Same for testnet
};

// Contract ABIs (you can import these from your artifacts)
export const CONTRACT_ABIS = {
  NFL_PICK_EMS: [
    // Add your contract ABI here
    "function enter(uint256 weekId, uint256 mask) external",
    "function getWeekInfo(uint256 weekId) external view returns (uint8, uint64, bool, bool, uint256, uint256, uint64)",
    "function getPlayerPicks(uint256 weekId, address player) external view returns (uint256, uint256, bool, bool)",
    "function ENTRY_FEE() external view returns (uint256)",
    "function oracle() external view returns (address)"
  ],
  MOCK_USDC: [
    "function balanceOf(address account) external view returns (uint256)",
    "function approve(address spender, uint256 amount) external returns (bool)",
    "function allowance(address owner, address spender) external view returns (uint256)",
    "function mint(address to, uint256 amount) external"
  ]
};

// Network configuration for wagmi
export const NETWORKS = {
  base: {
    id: 8453,
    name: 'Base',
    network: 'base',
    nativeCurrency: {
      decimals: 18,
      name: 'Ether',
      symbol: 'ETH',
    },
    rpcUrls: {
      public: { http: ['https://mainnet.base.org'] },
      default: { http: ['https://mainnet.base.org'] },
    },
    blockExplorers: {
      default: { name: 'BaseScan', url: 'https://basescan.org' },
    },
  },
  baseSepolia: {
    id: 84532,
    name: 'Base Sepolia',
    network: 'base-sepolia',
    nativeCurrency: {
      decimals: 18,
      name: 'Ether',
      symbol: 'ETH',
    },
    rpcUrls: {
      public: { http: ['https://sepolia.base.org'] },
      default: { http: ['https://sepolia.base.org'] },
    },
    blockExplorers: {
      default: { name: 'BaseScan', url: 'https://sepolia.basescan.org' },
    },
  }
};
