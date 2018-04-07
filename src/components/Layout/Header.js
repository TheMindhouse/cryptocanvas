import React from 'react'
import { Row } from 'antd'

import './styles/Header.css'
import { Link, NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <Row className="Header" justify="space-between" type="flex" align="middle">
      <div>
        <Link to="/" className="Header__title"><h1>CryptoCanvas</h1></Link>
        <h2 className="Header__subtitle">Distributed art on the blockchain</h2>
      </div>
      <ul className="Header__menu">
        <li>
          <NavLink to="/" exact
                   className="Header__menu-link"
                   activeClassName="Header__menu-link--active">
            Paint
          </NavLink>
        </li>
        <li>
          <NavLink to="/trade"
                   className="Header__menu-link"
                   activeClassName="Header__menu-link--active">
            Marketplace
          </NavLink>
        </li>
        <li>
          <NavLink to="/about"
                   className="Header__menu-link"
                   activeClassName="Header__menu-link--active">
            About
          </NavLink>
        </li>
      </ul>
    </Row>
  )
}

Header.propTypes = {}
Header.defaultProps = {}

export default Header
