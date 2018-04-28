// @flow
export const cutAddress = (address: string = ''):string => {
  return address.substr(0, 15)
}

export const isAddressNull = (address: string = ''):boolean => {
  return address === '0x0000000000000000000000000000000000000000'
}
