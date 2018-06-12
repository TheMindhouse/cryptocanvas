// @flow
declare var FB: {
  CustomerChat: {
    update: Function,
    showDialog: Function,
  }
}

type MessengerData = {
  GET_STARTED_DIALOG_SHOWN?: boolean,
  PIXEL_PAINTED_DIALOG_SHOWN?: boolean,
  HELP_DIALOG_SHOWN?: boolean,
}

const STORAGE_KEY = 'FB_MESSENGER_HELPER'

const isSDKLoaded = () =>
  typeof FB === 'object' &&
  typeof FB.CustomerChat === 'object' &&
  typeof FB.CustomerChat.update === 'function' &&
  typeof FB.CustomerChat.showDialog === 'function'

const getMessengerData = (): MessengerData => {
  const messengerData = window.localStorage.getItem(STORAGE_KEY) || '{}'
  return JSON.parse(messengerData)
}

const saveMessengerData = (messengerData: MessengerData) =>
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messengerData))


export const FbMessengerHelper = {
  showGetStartedDialog: () => {
    const messengerData: MessengerData = getMessengerData()
    if (!isSDKLoaded() || messengerData.GET_STARTED_DIALOG_SHOWN) {
      return
    }

    FB.CustomerChat.update({
      logged_in_greeting: 'Hi, we\'re here if you need any help!',
      logged_out_greeting: 'Hi, we\'re here if you need any help!',
    })
    FB.CustomerChat.showDialog()

    saveMessengerData({ ...messengerData, GET_STARTED_DIALOG_SHOWN: true })
  },

  showPixelPaintedDialog: () => {
    const messengerData: MessengerData = getMessengerData()
    if (!isSDKLoaded() || messengerData.PIXEL_PAINTED_DIALOG_SHOWN) {
      return
    }

    FB.CustomerChat.update({
      logged_in_greeting: 'We got a Painter over here! How\'s your experience so far?',
      logged_out_greeting: 'We got a Painter over here! How\'s your experience so far?',
    })
    FB.CustomerChat.showDialog()

    saveMessengerData({ ...messengerData, PIXEL_PAINTED_DIALOG_SHOWN: true })
  },

  showHelpDialog: () => {
    const messengerData: MessengerData = getMessengerData()
    if (!isSDKLoaded() || messengerData.HELP_DIALOG_SHOWN) {
      return
    }

    FB.CustomerChat.update({
      logged_in_greeting: 'How can we help you?',
      logged_out_greeting: 'How can we help you?',
    })
    FB.CustomerChat.showDialog()

    saveMessengerData({ ...messengerData, HELP_DIALOG_SHOWN: true })
  },

}