export const CONFIG = {
  CONTRACT_ADDRESS: '0x0c9b5c62e7ddeba23164fefa0ff10676e3b52629', // Main net
  WEB3_HTTP_PROVIDER: 'https://mainnet.infura.io/ML50g9METlqvSTgwiJTm',
  PAGE_TITLE: 'CryptoCanvas - Distributed art on the blockchain',
  // Delay to check transactions in ms
  CHECK_TX_DELAY: 3000,
  // Delay to check account address in ms
  CHECK_ACCOUNT_DELAY: 2000,
  // How long a canvas is stored in the cache, in ms
  CANVAS_CACHE_TIME: 15 * 60 * 1000,  // 15 minutes
  // Minimum bid in Initial Bidding
  MINIMUM_BID: 0.08,
  // Canvas Creation block
  startBlock: 5584261,
  pixelSize: {
    preview: 3,
    canvas: 10,
  },
  gridColumns: 64
}