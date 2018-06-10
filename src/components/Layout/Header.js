// @flow
import React from 'react'
import { Icon, Popover, Row } from 'antd'

import './styles/Header.css'
import { Link, NavLink } from 'react-router-dom'
import withWeb3 from '../../hoc/withWeb3'
import { URLHelper } from '../../helpers/URLhelper'
import { HashLink } from 'react-router-hash-link'
import { CONFIG } from '../../config'
import { METAMASK_NETWORK_NAMES, METAMASK_NETWORKS } from '../../constants/metamask'
import Mona from '../../assets/images/mona.png'
import { CountdownCounter } from '../../hoc/renderProps/CountdownCounter'
import { CountdownInline } from '../Small/CountdownInline'

type Props = {
  // from withWeb3
  account?: string,
}

const HeaderTestNet = () => (
  <Popover
    content={
      <Row type="flex" align="middle" className="HeaderTestnet__Popup">
        <Icon type="exclamation-circle" className="HeaderTestnet__WarningIcon" style={{ fontSize: 30 }}/>
        <span>
          This is only a TEST version of CryptoCanvas.<br />
          Go to <a href="https://cryptocanvas.art">cryptocanvas.art</a> for the real one.
        </span>
      </Row>
    }
    title=""
    placement="top"
    trigger="hover"
  >
    <span className="HeaderTestnet__Info">
      {METAMASK_NETWORK_NAMES[ CONFIG.ETHEREUM_NETWORK ]} <small><Icon type="question-circle-o" /></small>
    </span>
  </Popover>
)

const Header = (props: Props) => {
  return (
    <Row className="Header" justify="space-between" type="flex" align="middle">
      <Row justify="space-between" type="flex" align="middle">
        <img src={Mona} className="Header__Mona" />
        <div>
          <Link to={URLHelper.intro} className="Header__title">CryptoCanvas</Link>
          <h2 className="Header__subtitle">Distributed art on the blockchain</h2>

          <div className="Header__LaunchInfo">
            <span className="Header__Beta">Free Beta</span>
            Live version starts in&nbsp;
            <CountdownCounter
              date={new Date(1530446400000)}
              render={(state) => <CountdownInline {...state} />}
            />
          </div>

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
