import React from 'react'

import './CanvasSidebar.css'
import { Picker } from '../Picker/Picker'
import { PaintingHelp } from './PaintingHelp'
import { CanvasPainters } from './CanvasPainters'
import { Button } from 'antd'
import { TermsInfo } from '../Small/TermsInfo'
import { SelectedPixelsInfo } from './SelectedPixelsInfo'

const CanvasSidebarPainting = (props) => {
  const percentCompleted = parseInt((props.paintedPixels / props.totalPixels) * 100, 10)
  return (
    <div className="CanvasSidebar">
      <h2 className="CanvasSidebar__title">Canvas #{props.canvasId}</h2>
      {
        props.isCanvasLoading
          ? <h3 className="CanvasSidebar__status margin-bottom-none">Loading...</h3>
          : <h3 className="CanvasSidebar__status margin-bottom-none">
              {props.paintedPixels} {props.paintedPixels !== 1 ? 'pixels' : 'pixel'} out
              of {props.totalPixels} painted ({percentCompleted}%)
            </h3>
      }

      <CanvasPainters
        canvasId={props.canvasId}
        isCanvasLoading={props.isCanvasLoading}
        isCanvasFinished={false}
      />

      <h3><b>1. Choose a color</b></h3>
      <Picker
        changeActiveColor={props.changeActiveColor}
        activeColorId={props.activeColorId}
        isDisabled={props.isPickerDisabled}
      />

      <h3><b>2. Select pixels to paint</b></h3>
      <SelectedPixelsInfo canvasId={props.canvasId} />

      <Button type="primary" size="large">Submit to the blockchain</Button>
      <TermsInfo style={{ marginTop: 10 }}/>

      <br />
      <PaintingHelp />

    </div>
  )
}

CanvasSidebarPainting.propTypes = {}
CanvasSidebarPainting.defaultProps = {}

export default CanvasSidebarPainting
