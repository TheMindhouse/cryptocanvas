// @flow
import React from 'react'
import { LocalStorageManager } from '../localStorage'
import { SelectedPixel } from '../models/SelectedPixel'
import type { PixelIndex } from '../types/PixelIndex'

export const SelectedPixelsContext = React.createContext()

type Props = {
  children: typeof React.Children
}

export type SelectedPixelsProviderState = {
  selectedPixels: Array<SelectedPixel>,
  getSelectedPixels: (canvasId?: number) => Array<SelectedPixel>,
  selectPixel: (SelectedPixel) => void,
  removeSelectedPixel: ({ canvasId: number, pixelIndex: PixelIndex }) => boolean,
  pixelExists: (SelectedPixel) => boolean,
}

export class SelectedPixelsProvider extends React.Component<Props, SelectedPixelsProviderState> {
  constructor (props: Props) {
    super(props)
    this.state = {
      selectedPixels: LocalStorageManager.selectedPixels.getSelectedPixels(),
      getSelectedPixels: this.getSelectedPixels,
      selectPixel: this.selectPixel,
      removeSelectedPixel: this.removeSelectedPixel,
      pixelExists: this.pixelExists,
    }
  }

  getSelectedPixels = (canvasId?: number = -1) => {
    return canvasId >= 0
      ? this.state.selectedPixels.filter((selectedPixel: SelectedPixel) => selectedPixel.canvasId === canvasId)
      : this.state.selectedPixels
  }

  selectPixel = (selectedPixel: SelectedPixel) => {
    const newSelectedPixels = LocalStorageManager.selectedPixels.selectPixel(selectedPixel)
    console.log(`Selected pixel. New selected pixels: `, newSelectedPixels)
    this.setState({ selectedPixels: newSelectedPixels })
  }

  removeSelectedPixel = ({ canvasId, pixelIndex }: { canvasId: number, pixelIndex: PixelIndex }) => {
    const oldSelectedPixels = this.state.selectedPixels
    const newSelectedPixels = LocalStorageManager.selectedPixels.removeSelectedPixel({ canvasId, pixelIndex })
    console.log(`Removed selected pixel. New selected pixels: `, newSelectedPixels)
    this.setState({ selectedPixels: newSelectedPixels })

    // Return true if the pixel was saved before and has now been deleted
    return oldSelectedPixels.length > newSelectedPixels.length
  }

  pixelExists = (selectedPixel: SelectedPixel) =>
    this.getSelectedPixels(selectedPixel.canvasId)
      .findIndex((savedPixel: SelectedPixel) =>
        savedPixel.pixelIndex.id === selectedPixel.pixelIndex.id &&
        savedPixel.colorId === selectedPixel.colorId
      ) > -1

  render () {
    return (
      <SelectedPixelsContext.Provider value={this.state}>
        {this.props.children}
      </SelectedPixelsContext.Provider>
    )
  }
}
