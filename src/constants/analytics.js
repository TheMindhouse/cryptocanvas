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
    paintPixelConfirm: 'Paint pixel confirm popup',
    paintPixelSubmit: 'Paint pixel submit',
    paintPixelFailed: 'Paint pixel failed',
  }
}

export { ANALYTICS_EVENTS, ANALYTICS_ACTIONS }