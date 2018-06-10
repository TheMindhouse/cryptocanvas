// @flow
export const URLHelper = {
  account: (address: string): string => `/account/${address}`,
  canvas: (canvasId: number): string => `/canvas/${canvasId}`,
  intro: '/',
  getStarted: '/get-started',
  home: '/gallery',
  about: '/about',
  contact: '/contact',
  terms: '/terms-of-use',
  pageNotFound: '/404',
  help: {
    page: '/help',
    installingMetamask: '/help#installing-metamask',
    gettingEther: '/help#getting-ether',
  },
}