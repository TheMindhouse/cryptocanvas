import { METAMASK_NETWORKS } from './constants/metamask'

const CONFIG_MAIN = {
  // Contract settings
  CONTRACT_ADDRESS: '0x0c9b5c62e7ddeba23164fefa0ff10676e3b52629', // Main net
  WEB3_HTTP_PROVIDER: 'https://mainnet.infura.io/ML50g9METlqvSTgwiJTm',
  ETHEREUM_NETWORK: METAMASK_NETWORKS.main,
  // Browser page title
  PAGE_TITLE: 'CryptoCanvas - Create, Trade & Collect Blockchain Artworks',
  // Delay to check transactions in ms
  CHECK_TX_DELAY: 3000,
  // Delay to check account address in ms
  CHECK_ACCOUNT_DELAY: 2000,
  // Delay to check account address in ms
  CHECK_GAS_PRICE_DELAY: 60 * 1000, // 1 minute
  // Delay to check account address in ms
  CHECK_ETH_PRICE_DELAY: 60 * 60 * 1000, // 1 hour
  // How long a canvas is stored in the cache, in ms
  CANVAS_CACHE_TIME: 15 * 60 * 1000,  // 15 minutes
  // Minimum bid in Initial Bidding
  MINIMUM_BID: 0.08,
  // Maximum number of canvases painted at the same time
  MAX_ACTIVE_CANVASES: 12,
  // Maximum number of canvases in total
  MAX_TOTAL_CANVASES: 1000,
  // Maximum number of selected pixels on a single canvas
  MAX_SELECTED_PIXELS: 100,
  // Canvas Creation block
  startBlock: 5584261,
  pixelSize: {
    preview: 3,
    canvas: 10,
  },
  gridColumns: 64
}

const CONFIG_RINKEBY = {
  // Contract settings
  CONTRACT_ADDRESS: '0x13bfa7d3b3e905ee5c611fa1097b03bf8f5d634a', // Rinkeby testnet
  WEB3_HTTP_PROVIDER: 'https://rinkeby.infura.io/ML50g9METlqvSTgwiJTm',
  ETHEREUM_NETWORK: METAMASK_NETWORKS.rinkeby,
  // Browser page title
  PAGE_TITLE: 'CryptoCanvas BETA - Create, Trade & Collect Blockchain Artworks',
  // Delay to check transactions in ms
  CHECK_TX_DELAY: 3000,
  // Delay to check account address in ms
  CHECK_ACCOUNT_DELAY: 2000,
  // Delay to check account address in ms
  CHECK_GAS_PRICE_DELAY: 60 * 1000, // 1 minute
  // Delay to check account address in ms
  CHECK_ETH_PRICE_DELAY: 60 * 60 * 1000, // 1 hour
  // How long a canvas is stored in the cache, in ms
  CANVAS_CACHE_TIME: 15 * 60 * 1000,  // 15 minutes
  // Minimum bid in Initial Bidding
  MINIMUM_BID: 0.08,
  // Maximum number of canvases painted at the same time
  MAX_ACTIVE_CANVASES: 12,
  // Maximum number of canvases in total
  MAX_TOTAL_CANVASES: 1000,
  // Maximum number of selected pixels on a single canvas
  MAX_SELECTED_PIXELS: 100,
  // Canvas Creation block
  startBlock: 5584261,
  pixelSize: {
    preview: 48,
    canvas: 128,
  },
  gridColumns: 5
}

const getConfig = () => {
    switch (process.env.REACT_APP_ETHEREUM_NETWORK) {
      case 'rinkeby':
        return CONFIG_RINKEBY
      case 'main':
      default:
        return CONFIG_MAIN
    }
}

export const CONFIG = getConfig()