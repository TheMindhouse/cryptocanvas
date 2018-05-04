// @flow
import { CanvasPixelsCache } from '../models/CanvasPixelsCache'
import moment from 'moment'
import { CONFIG } from '../config'

const STORAGE_KEY = 'CANVAS_CACHE'

const getSavedCanvases = () => {
  const canvases = window.localStorage.getItem(STORAGE_KEY) || '[]'
  return JSON.parse(canvases).map(canvas => new CanvasPixelsCache(canvas))
}

const getCanvasCache = (canvasId: number): ?CanvasPixelsCache => {
  const savedCanvas: ?CanvasPixelsCache = getSavedCanvases().find((canvas: CanvasPixelsCache): boolean => canvas.canvasId === canvasId)

  if (!savedCanvas) {
    return null
  }

  if (savedCanvas.isExpired()) {
    console.log(`STORAGE: Canvas #${savedCanvas.canvasId} is expired, removing...`)
    removeFromSavedCanvases(savedCanvas)
    return null
  }

  console.log(`STORAGE: Returning data for Canvas #${savedCanvas.canvasId}. Expires on ${moment(savedCanvas.expirationDate).calendar()}`)
  return savedCanvas
}

const removeFromSavedCanvases = (savedCanvas: CanvasPixelsCache): void => {
  // Get already saved canvases
  const savedCanvases = getSavedCanvases()
  // Check if canvas is saved already
  const index = savedCanvases.findIndex((canvas: CanvasPixelsCache): boolean => canvas.canvasId === savedCanvas.canvasId)

  if (index >= 0) {
    const newSavedCanvases =
      [
        ...savedCanvases.slice(0, index),
        ...savedCanvases.slice(index + 1, savedCanvases.length)
      ]
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(newSavedCanvases))
  }
}

const updateCanvasCache = ({ canvasId, pixelsMap, withExpirationDate = true }: {
  canvasId: number,
  pixelsMap: Array<number>,
  withExpirationDate?: boolean,
}): void => {
  const expirationDate = withExpirationDate ? getExpirationDate() : null
  const canvasToSave = new CanvasPixelsCache({ canvasId, pixelsMap, expirationDate })

  // Get already saved canvases
  const savedCanvases = getSavedCanvases()
  // Check if canvas is saved already
  const index = savedCanvases.findIndex((canvas: CanvasPixelsCache): boolean => canvas.canvasId === canvasId)

  const newSavedCanvases = (index >= 0)
      ? [
        ...savedCanvases.slice(0, index),
        canvasToSave,
        ...savedCanvases.slice(index + 1, savedCanvases.length)
      ]
      : [
        ...savedCanvases,
        canvasToSave
      ]

  console.log(`STORAGE: Adding new Canvas #${canvasToSave.canvasId} to the storage.`, newSavedCanvases)
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(newSavedCanvases))
}

const getExpirationDate = () => {
  return moment(new Date()).add(CONFIG.CANVAS_CACHE_TIME, 'ms').toDate()
}

export const canvasPixels = {
  getCanvasCache,
  updateCanvasCache,
}
