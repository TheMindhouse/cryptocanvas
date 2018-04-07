import React from 'react'
import { Link } from 'react-router-dom'

const WithoutReward = () => {
  return (
    <div>
      <p>
        You haven't painted any final pixels on this Canvas. Try on <Link to="/">another one</Link>!
      </p>
    </div>
  )
}

WithoutReward.propTypes = {}
WithoutReward.defaultProps = {}

export default WithoutReward
