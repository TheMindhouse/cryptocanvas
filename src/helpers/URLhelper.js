// @flow
export const URLHelper = {
  account: (address: string): string => `/account/${address}`,
  canvas: (canvasId: number): string => `/canvas/${canvasId}`,
  about: '/about',
  contact: '/contact',
  terms: '/terms-of-use',
  help: {
    page: '/help',
    installingMetamask: '/help#installing-metamask',
    gettingEther: '/help#getting-ether',
  },
}