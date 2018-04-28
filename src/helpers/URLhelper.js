// @flow
export const URLHelper = {
  account: (address: string): string => `/account/${address}`,
  canvas: (canvasId: number): string => `/canvas/${canvasId}`,
  about: '/about',
  help: {
    page: '/help',
    installingMetamask: '/help#installing-metamask',
    gettingEther: '/help#getting-ether',
  },
}