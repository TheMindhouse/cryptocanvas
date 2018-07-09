// @flow
import * as React from 'react'
import { Button, Divider, Icon } from 'antd'
import Moment from 'react-moment'
import './styles/BetaInfo.css'
import { CountdownCounter } from '../../hoc/renderProps/CountdownCounter'
import { Countdown } from '../../components/Small/Countdown'
import { CONFIG } from '../../config'
import { URLHelper } from '../../helpers/URLhelper'
import { Link } from 'react-router-dom'

const LIVE_LAUNCH_DATE = CONFIG.SHARED.LIVE_LAUNCH_DATE

const BetaInfo = () => {
  return (
    <div className="IntroSectionBeta container text-center">
      <p className="Intro__Header--medium">
        <b>Check out BETA now.</b>
      </p>
      <p className="Intro__text">
        Running on Test Network. Completely free, no transaction fees.
      </p>

      <div style={{ margin: '50px 0' }}>
        <Link to={URLHelper.getStarted}>
          <Button type="primary" size="large" className="Intro__button">
            Get started for free <Icon type="arrow-right" />
          </Button>
        </Link>
      </div>

      {
        new Date() < new Date(LIVE_LAUNCH_DATE)
          ?
          <div>
            <p className="Intro__text">Live version starts in:</p>
            <CountdownCounter
              date={new Date(LIVE_LAUNCH_DATE)}
              render={(state) => <Countdown {...state} />}
            />
            <span className="IntroSectionBeta__CountdownDate">
              <Moment date={new Date(LIVE_LAUNCH_DATE)} format="dddd, MMMM Do YYYY, h:mm A (Z" /> UTC)
            </span>
          </div>
          :
          <div>
            <Divider />
            <p className="Intro__Header--medium"><b>Main Network version available at:</b></p>
            <p className="Intro__text">
              <a href="https://cryptocanvas.art"><b>https://cryptocanvas.art</b></a>
            </p>
          </div>
      }
    </div>
  )
}

BetaInfo.defaultProps = {}

export default BetaInfo
