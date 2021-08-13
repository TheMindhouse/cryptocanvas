// @flow

export const gasCalculator = {
  setPixels: (pixelsCount: number, hasFirstPixel: boolean):number => {
    const FIRST_PIXEL = 55000
    const REGULAR_PIXEL = 45000
    const EXTRA_OPERATIONS = 30000
    let totalGas = pixelsCount * REGULAR_PIXEL + EXTRA_OPERATIONS
    if (hasFirstPixel) totalGas += FIRST_PIXEL

    // Add % for calculated gas for extra protection against out of gas situations
    const SAFETY_MARGIN_MULTIPLIER = 1.2;

    return totalGas * SAFETY_MARGIN_MULTIPLIER
  },
}
