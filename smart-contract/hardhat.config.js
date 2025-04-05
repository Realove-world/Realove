/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require("dotenv").config();

module.exports = {
  solidity: "0.8.27",
  networks: {
    hardhat: {
      chainId: 31337,
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
    },
    worldchain: {
      url:
        process.env.WORLDCHAIN_RPC_URL ||
        "https://worldchain-mainnet.g.alchemy.com/public",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 59144,
    },
  },
  etherscan: {
    apiKey: {
      worldchain: process.env.WORLDCHAIN_API_KEY || "", // Get this from the Worldchain block explorer
    },
    customChains: [
      {
        network: "worldchain",
        chainId: 59144,
        urls: {
          apiURL: "https://explorer.worldcoin.org/api",
          browserURL: "https://explorer.worldcoin.org",
        },
      },
    ],
  },
  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./contracts",
    tests: "./test",
  },
};
