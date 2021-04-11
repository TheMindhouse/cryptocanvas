// @flow
import { CanvasPaintersCache } from '../models/CanvasPaintersCache'
import { CONFIG } from '../config'

const STORAGE_KEY = 'CANVAS_PAINTERS_CACHE_' + CONFIG.ETHEREUM_NETWORK

const getSavedCanvasPaintersCache = () => {
  const canvases = window.localStorage.getItem(STORAGE_KEY) || '[]'
  return JSON.parse(canvases).map(canvas => new CanvasPaintersCache(canvas))
}

const getPaintersCache = (canvasId: number): ?CanvasPaintersCache => {
  const paintersCache: ?CanvasPaintersCache = getSavedCanvasPaintersCache()
    .find((cache: CanvasPaintersCache): boolean => cache.canvasId === canvasId)

  if (!paintersCache) {
    return null
  }

  return paintersCache
}

const updatePaintersCache = ({ canvasId, canvasPainters }: {
  canvasId: number,
  canvasPainters: Array<string>,
}): void => {
  const canvasToSave = new CanvasPaintersCache({ canvasId, canvasPainters })

  // Get already saved canvases
  const savedCanvases = getSavedCanvasPaintersCache()
  // Check if canvas is saved already
  const index = savedCanvases.findIndex((cache: CanvasPaintersCache): boolean => cache.canvasId === canvasId)

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

  // console.log(`STORAGE: Adding Painters of Canvas #${canvasToSave.canvasId} to the storage.`)
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(newSavedCanvases))
}

export const canvasPainters = {
  getPaintersCache,
  updatePaintersCache,
}
