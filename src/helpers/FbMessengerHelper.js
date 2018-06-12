// @flow
declare var FB: {
  CustomerChat: {
    update: Function,
    showDialog: Function,
  }
}

const isSDKLoaded = () =>
  typeof FB === 'object' &&
  typeof FB.CustomerChat === 'object' &&
  typeof FB.CustomerChat.update === 'function' &&
  typeof FB.CustomerChat.showDialog === 'function'

export const FbMessengerHelper = {
  showGetStartedDialog: () => {
    if (!isSDKLoaded()) {
      return
    }
    FB.CustomerChat.update({
      logged_in_greeting: 'Hi! I\'ll be here if you need any help!',
      logged_out_greeting: 'Hi! Log in to chat if you need any help!',
    })
    FB.CustomerChat.showDialog()
  },
  showPixelPaintedDialog: () => {
    if (!isSDKLoaded() || window.pixelPaintedDialogShown) {
      return
    }
    FB.CustomerChat.update({
      logged_in_greeting: 'We have a Painter over here! How\'s your experience so far? :)',
      logged_out_greeting: 'We have a Painter over here! How\'s your experience so far? :)',
    })
    FB.CustomerChat.showDialog()
    window.pixelPaintedDialogShown = true
  }
}