import { METAMASK_NETWORKS } from './constants/metamask'

export const CONFIG = {
  PAGE_TITLE: 'CryptoCanvas - Distributed art on the blockchain',
  CONTRACT_ADDRESS: '0x5e68426C7bBCEe3F590B95Dd52066AA2efF6165B', // Rinkeby testnet
  WEB3_HTTP_PROVIDER: 'https://rinkeby.infura.io/ML50g9METlqvSTgwiJTm',
  ETHEREUM_NETWORK: METAMASK_NETWORKS.rinkeby,
  // Delay to check transactions in ms
  CHECK_TX_DELAY: 3000,
  // Delay to check account address in ms
  CHECK_ACCOUNT_DELAY: 2000,
  // How long a canvas is stored in the cache, in ms
  CANVAS_CACHE_TIME: 15 * 60 * 1000,  // 15 minutes
  // Minimum bid in Initial Bidding
  MINIMUM_BID: 0.08,
  // Maximum number of canvases painted at the same time
  MAX_ACTIVE_CANVASES: 12,
  // Maximum number of canvases in total
  MAX_TOTAL_CANVASES: 1000,
  // Canvas Creation block
  startBlock: 5584261,
  pixelSize: {
    // preview: 3,
    // canvas: 10,
    preview: 60,
    canvas: 220,
  },
  gridColumns: 3
}