// @flow
import * as React from 'react'
import pixelBg from '../assets/images/pixels.png'
import logo from '../assets/images/logo-wide.png'
import './styles/AppLaunchPlaceholder.css'
import { CountdownCounter } from '../hoc/renderProps/CountdownCounter'
import { CONFIG } from '../config'
import { Countdown } from '../components/Small/Countdown'
import Moment from 'react-moment'
import { Button, Icon } from 'antd'

class AppLaunchPlaceholder extends React.Component<{}> {
  static defaultProps = {}

  render () {
    return (
      <div className="AppLaunchPlaceholder" style={{ backgroundImage: `url(${pixelBg})` }}>
        <img src={logo} className="AppLaunchPlaceholder__logo" />
        <h1 className="AppLaunchPlaceholder__headline">Create, Trade & Collect Blockchain Artworks</h1>
        <div className="text-center">
          <h2>Live version starts in:</h2>
          <CountdownCounter
            date={new Date(CONFIG.SHARED.LIVE_LAUNCH_DATE)}
            render={(state) => <Countdown {...state} />}
          />
          <span className="BetaInfo__CountdownDate">
            <Moment date={new Date(CONFIG.SHARED.LIVE_LAUNCH_DATE)} format="dddd, MMMM Do YYYY, h:mm A (Z" /> UTC)
          </span>
          <br /><br /><br />
          <a href="https://beta.cryptocanvas.art">
            <Button type="primary" size="large" className="Intro__button">
              Try Free Beta Now <Icon type="arrow-right" />
            </Button>
          </a>
        </div>
      </div>
    )
  }
}

export { AppLaunchPlaceholder }
