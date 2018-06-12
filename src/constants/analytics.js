const ANALYTICS_EVENTS = {
  metamask: 'MetaMask',
  painting: 'Painting',
}

const ANALYTICS_ACTIONS = {
  metamask: {
    accountActive: 'Account active'
  },
  painting: {
    colorSelected: 'Color selected',
    pixelSelected: 'Pixel selected',
    paintPixelsSubmit: 'Paint pixels submit',
    paintPixelsFailed: 'Paint pixels failed',
  }
}

export { ANALYTICS_EVENTS, ANALYTICS_ACTIONS }