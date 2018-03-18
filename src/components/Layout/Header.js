import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'

import './Header.css'

const Header = (props) => {
  return (
    <Row className="Header" justify="space-between" type="flex" align="middle">
      <div>
        <h1 className="Header__title">CryptoCanvas</h1>
        <h2 className="Header__subtitle">Distributed art on the blockchain</h2>
      </div>
      <ul className="Header__menu">
        <li>Draw</li>
        <li>Marketplace</li>
        <li>About</li>
      </ul>
    </Row>
  )
}

Header.propTypes = {}
Header.defaultProps = {}

export default Header
