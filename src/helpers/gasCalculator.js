// @flow

export const gasCalculator = {
  setPixels: (pixelsCount: number, hasFirstPixel: boolean):number => {
    const FIRST_PIXEL = 55000
    const REGULAR_PIXEL = 45000
    let totalGas = pixelsCount * REGULAR_PIXEL
    if (hasFirstPixel) totalGas += FIRST_PIXEL
    return totalGas
  },
}
