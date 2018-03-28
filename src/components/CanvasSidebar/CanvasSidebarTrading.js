import React from 'react'
import PropTypes from 'prop-types'
import { Divider } from 'antd'
import HighestBid from './HighestBid'
import SubmitBid from './SubmitBid'
import BiddingTimeLeft from './BiddingTimeLeft'
import CurrentOwner from './CurrentOwner'

const CanvasSidebarTrading = (props) => {
  return (
    <div className="CanvasSidebar">
      <h2 className="CanvasSidebar__title">Canvas #{props.canvasId}</h2>
      <h3 className="CanvasSidebar__status">Completed</h3>

      <Divider />

      <CurrentOwner
        canvasOwner={props.canvasOwner}
        isUserCanvasOwner={props.isUserCanvasOwner}
      />

    </div>
  )
}

CanvasSidebarTrading.propTypes = {}
CanvasSidebarTrading.defaultProps = {}

export default CanvasSidebarTrading
