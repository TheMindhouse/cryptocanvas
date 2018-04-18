// @flow
import React from 'react'
import { Popover, Row, Tooltip } from 'antd'

import './styles/Header.css'
import { Link, NavLink } from 'react-router-dom'
import withWeb3 from '../../hoc/withWeb3'

type Props = {
  // from withWeb3
  account?: string,
}

const Header = (props: Props) => {
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

        {
          props.account &&
          <li>
            <NavLink to="/account"
                     className="Header__menu-link"
                     activeClassName="Header__menu-link--active">
              My Account
            </NavLink>
          </li>
        }

        {
          !props.account &&
          <li>
              <Popover
                content={<span>Log into MetaMask to manage your account. See <Link to="/help#installing-metamask">Installing MetaMask</Link></span>}
                title=""
                placement="bottom"
                trigger="hover"
              >
              <span className="Header__menu-link  Header__menu-link--disabled">
                My Account
              </span>
              </Popover>
          </li>
        }
      </ul>
    </Row>
  )
}

Header.propTypes = {}
Header.defaultProps = {}

export default withWeb3(Header)
