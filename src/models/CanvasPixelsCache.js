// @flow
export class CanvasPixelsCache {
  canvasId: number
  pixelsMap: Array<number>
  expirationDate: ?Date

  constructor ({ canvasId, pixelsMap, expirationDate }: {
    canvasId: number,
    pixelsMap: Array<number>,
    expirationDate: ?Date,
  }) {
    this.canvasId = canvasId
    this.pixelsMap = pixelsMap
    this.expirationDate = expirationDate
  }

  isExpired = (): boolean => {
    return this.expirationDate
      ? new Date(this.expirationDate) < new Date()
      : false
  }
}