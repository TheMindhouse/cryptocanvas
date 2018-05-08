import React from 'react'

import './CanvasSidebar.css'
import { Picker } from '../Picker/Picker'
import { PaintingHelp } from './PaintingHelp'
import { CanvasPainters } from './CanvasPainters'

const CanvasSidebarPainting = (props) => {
  const percentCompleted = parseInt((props.paintedPixels / props.totalPixels) * 100, 10)
  return (
    <div className="CanvasSidebar">
      <h2 className="CanvasSidebar__title">Canvas #{props.canvasId}</h2>
      {
        props.isCanvasLoading
          ? <h3 className="CanvasSidebar__status">Loading...</h3>
          : <h3 className="CanvasSidebar__status">
              {props.paintedPixels} {props.paintedPixels !== 1 ? 'pixels' : 'pixel'} out
              of {props.totalPixels} painted ({percentCompleted}%)
            </h3>
      }

      <CanvasPainters
        canvasId={props.canvasId}
        isCanvasLoading={props.isCanvasLoading}
        isCanvasFinished={false}
      />

      <Picker
        changeActiveColor={props.changeActiveColor}
        activeColorId={props.activeColorId}
        isDisabled={props.isPickerDisabled}
      />

      <br />
      <PaintingHelp />

    </div>
  )
}

CanvasSidebarPainting.propTypes = {}
CanvasSidebarPainting.defaultProps = {}

export default CanvasSidebarPainting
