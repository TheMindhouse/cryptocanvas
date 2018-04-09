import React from 'react'

import './CanvasSidebar.css'
import { Picker } from '../Picker/Picker'

const CanvasSidebarPainting = (props) => {
  const percentCompleted = parseInt((props.paintedPixels / props.totalPixels) * 100, 10)
  return (
    <div className="CanvasSidebar">
      <h2 className="CanvasSidebar__title">Canvas #{props.canvasId}</h2>
      {
        props.totalPixels > 0 &&
        <h3 className="CanvasSidebar__status">
          {props.paintedPixels} {props.paintedPixels !== 1 ? 'pixels' : 'pixel'} out of {props.totalPixels} painted ({percentCompleted}%)
        </h3>
      }

      <Picker
        changeColor={props.changeColor}
        currentColor={props.currentColor}
        isDisabled={props.isPickerDisabled}
      />

      <br />
      <p>How can I place a pixel?</p>

    </div>
  )
}

CanvasSidebarPainting.propTypes = {}
CanvasSidebarPainting.defaultProps = {}

export default CanvasSidebarPainting
