export const CONFIG = {
  // CONTRACT_ADDRESS: '0x4d5cafaa44847c01fe22bbc0cf9771b64782fa29', // Local
  CONTRACT_ADDRESS: '0x5e68426C7bBCEe3F590B95Dd52066AA2efF6165B', // Rinkeby testnet
  // WEB3_HTTP_PROVIDER: 'http://localhost:8545',
  WEB3_HTTP_PROVIDER: 'https://rinkeby.infura.io/ML50g9METlqvSTgwiJTm',
  // Delay to check transactions in ms
  CHECK_TX_DELAY: 3000,
  // Delay to check account address in ms
  CHECK_ACCOUNT_DELAY: 2000,
  startBlock: 228,
  pixelSize: {
    preview: 20,
    canvas: 220,
  },
  gridColumns: 3,
}