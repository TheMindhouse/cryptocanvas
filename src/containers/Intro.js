// @flow
import * as React from 'react'
import { YoutubePlayer } from '../components/Small/YoutubePlayer'
import './styles/Intro.css'
import BetaInfo from './Homepage/BetaInfo'
import { CONFIG } from '../config'
import { METAMASK_NETWORKS } from '../constants/metamask'

const Intro = () => {
  return (
    <div>
      {
        CONFIG.ETHEREUM_NETWORK !== METAMASK_NETWORKS.main &&
        <BetaInfo />
      }
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
