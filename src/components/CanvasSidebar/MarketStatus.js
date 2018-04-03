import React from 'react'
import MarketStatusOwner from './MarketStatusOwner'
import MarketStatusDefault from './MarketStatusDefault'

const MarketStatus = (props) => (
  props.isUserCanvasOwner
    ? <MarketStatusOwner {...props} />
    : <MarketStatusDefault {...props} />
)

MarketStatus.propTypes = {}
MarketStatus.defaultProps = {}

export default MarketStatus
