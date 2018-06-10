// @flow
export const cutAddress = (address: string = ''): string => {
  return address.substr(0, 15)
}

export const isAddressNull = (address: string = ''): boolean => {
  return address === '0x0000000000000000000000000000000000000000'
}

export const padStart = (value: number) => {
  if (String.prototype.padStart) {
    return String(value).padStart(2, '0')
  }
  return value
}