// @flow
export class CanvasPaintersCache {
  canvasId: number
  canvasPainters: Array<string>

  constructor ({ canvasId, canvasPainters }: {
    canvasId: number,
    canvasPainters: Array<string>,
  }) {
    this.canvasId = canvasId
    this.canvasPainters = canvasPainters
  }
}