// @flow

export const gasCalculator = {
  setPixels: (pixelsCount: number, hasFirstPixel: boolean):number => {
    const FIRST_PIXEL = 55000
    const REGULAR_PIXEL = 45000
    const EXTRA_OPERATIONS = 30000
    let totalGas = pixelsCount * REGULAR_PIXEL + EXTRA_OPERATIONS
    if (hasFirstPixel) totalGas += FIRST_PIXEL
    return totalGas
  },
}
