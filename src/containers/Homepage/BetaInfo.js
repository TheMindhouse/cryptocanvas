// @flow
import * as React from 'react'
import { Col, Row } from 'antd'
import Countdown from 'react-countdown-now'
import Moment from 'react-moment'
import './styles/BetaInfo.css'

const LIVE_START_DATE = 1530446400000

const BetaInfo = () => {
  return (
    <div className="BetaInfo">
      <Row type="flex" align="middle" className="BetaInfo__content container">
        <Col xs={{ span: 24 }} md={{ span: 16 }}>
          <h1><b>Welcome to CryptoCanvas BETA</b></h1>
          <h3>This is a completely FREE version running on Rinkeby Test Network.</h3>
          <h3>
            <a href="https://faucet.rinkeby.io/" target="_blank" rel="noopener noreferrer">
              Get Test Ether for free here
            </a>
          </h3>
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 8 }} className="text-center">
          <h2>Live version starts in:</h2>
          <h2 className="BetaInfo__Countdown">
            <b><Countdown date={LIVE_START_DATE} /></b>
          </h2>
          <span><Moment date={new Date(LIVE_START_DATE)} format="dddd, MMMM Do YYYY, h:mm a" /> UTC</span>
        </Col>
      </Row>
    </div>
  )
}

BetaInfo.defaultProps = {}

export default BetaInfo
