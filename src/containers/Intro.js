// @flow
import * as React from 'react'
import { YoutubePlayer } from '../components/Small/YoutubePlayer'
import './styles/Intro.css'
import { URLHelper } from '../helpers/URLhelper'
import { Link } from 'react-router-dom'
import { Button, Icon } from 'antd'
import BetaInfo from './Homepage/BetaInfo'

const Intro = () => {
  return (
    <div>
      <BetaInfo />
      <div className="container">
        <div className="Intro__video">
          <YoutubePlayer videoId="qRbZ_wcWzL0" playing />
        </div>
      </div>
    </div>
  )
}

Intro.defaultProps = {}

export default Intro
