// @flow
import React from 'react'
import { Popover, Row } from 'antd'

import './styles/Header.css'
import { Link, NavLink } from 'react-router-dom'
import withWeb3 from '../../hoc/withWeb3'
import { URLHelper } from '../../helpers/URLhelper'
import { HashLink } from 'react-router-hash-link'
import Mona from '../../assets/images/mona.png'
import logo from '../../assets/images/logo-wide.png'
import { CONFIG } from '../../config'
import { HeaderLaunchInfo } from '../Header/HeaderLaunchInfo'
import { METAMASK_NETWORKS } from '../../constants/metamask'

type Props = {
  // from withWeb3
  account?: string,
}

const Header = (props: Props) => {
  return (
    <Row className="Header" justify="space-between" type="flex" align="middle">
      <Row justify="space-between" type="flex" align="middle">
        <img src={Mona} className="Header__Mona" alt="" />
        <div>
          <Link to={URLHelper.intro} className="Header__link">
            <img src={logo} className="Header__logo" alt="" />
            <h2 className="Header__subtitle">Create, Trade & Collect Blockchain Artworks</h2>
          </Link>

          {
            CONFIG.ETHEREUM_NETWORK !== METAMASK_NETWORKS.main &&
            <HeaderLaunchInfo />
          }
          {/*{CONFIG.ETHEREUM_NETWORK !== METAMASK_NETWORKS.main && <HeaderTestNet />}*/}
        </div>
      </Row>
      <ul className="Header__menu">
        <li>
          <NavLink to={URLHelper.home} exact
                   className="Header__menu-link"
                   activeClassName="Header__menu-link--active">
            <span className="hidden-mobile">Canvas</span> Gallery
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
            <NavLink to={`/account/${props.account}`}
                     className="Header__menu-link"
                     activeClassName="Header__menu-link--active">
              <span className="hidden-mobile">My</span> Account
            </NavLink>
          </li>
        }

        {
          !props.account &&
          <li>
            <Popover
              content={<span>Log into MetaMask to manage your account.
                  See <HashLink to={URLHelper.help.installingMetamask}>Installing MetaMask</HashLink></span>}
              title=""
              placement="bottom"
              trigger="hover"
            >
                <span className="Header__menu-link  Header__menu-link--disabled">
                  <span className="hidden-mobile">My</span> Account
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
