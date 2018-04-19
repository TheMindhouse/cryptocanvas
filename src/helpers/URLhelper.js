// @flow
export const URLHelper = {
  account: (address: string): string => `/account/${address}`,
  canvas: (canvasId: number): string => `/canvas/${canvasId}`,
}