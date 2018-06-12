// @flow
import { SelectedPixel } from '../models/SelectedPixel'

const STORAGE_KEY = 'USER_SELECTED_PIXELS'

const getSelectedPixels = (): Array<SelectedPixel> => {
  const selectedPixelsJson = window.localStorage.getItem(STORAGE_KEY) || '[]'
  return JSON.parse(selectedPixelsJson).map(selectedPixel => new SelectedPixel(selectedPixel))
}

const selectPixel = ({ canvasId, pixelIndex, colorId }: SelectedPixel = {}): Array<SelectedPixel> => {
  const selectedPixelToSave = new SelectedPixel({ canvasId, pixelIndex, colorId })
  // If color equals zero, it means the pixel was deselected and we need to remove it
  if (colorId === 0) {
    return removeSelectedPixel(selectedPixelToSave)
  }
  // Get currently selected pixels
  const selectedPixels = getSelectedPixels()
  // Check if pixel is saved already
  const index = selectedPixels.findIndex((pixel: SelectedPixel): boolean =>
    pixel.canvasId === canvasId && pixel.pixelIndex.id === pixelIndex.id
  )
  // Create new array of selected pixels
  const newSelectedPixels = (index >= 0)
    ? [
      ...selectedPixels.slice(0, index),
      selectedPixelToSave,
      ...selectedPixels.slice(index + 1, selectedPixels.length),
    ]
    : [
      ...selectedPixels,
      selectedPixelToSave,
    ]
  // Save to local storage
  // console.log(`STORAGE: Adding Pixel #${selectedPixelToSave.pixelIndex.id} of Canvas #${selectedPixelToSave.canvasId} to the storage.`)
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(newSelectedPixels))

  return newSelectedPixels
}

const removeSelectedPixel = ({ canvasId, pixelIndex }: SelectedPixel = {}): Array<SelectedPixel> => {
  // Get currently selected pixels
  const selectedPixels = getSelectedPixels()
  // Check if pixel is saved already
  const index = selectedPixels.findIndex((pixel: SelectedPixel): boolean =>
    pixel.canvasId === canvasId && pixel.pixelIndex.id === pixelIndex.id
  )
  // Create new array of selected pixels
  if (index >= 0) {
    const newSelectedPixels =
      [
        ...selectedPixels.slice(0, index),
        ...selectedPixels.slice(index + 1, selectedPixels.length)
      ]
    // Save to local storage
    // console.log(`STORAGE: Removed Pixel #${pixelIndex.id} of Canvas #${canvasId} from the storage.`)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(newSelectedPixels))
    return newSelectedPixels
  }
  return selectedPixels
}

export const selectedPixels = {
  selectPixel,
  removeSelectedPixel,
  getSelectedPixels,
}