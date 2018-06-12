// @flow
import * as React from 'react'
import { YoutubePlayer } from '../components/Small/YoutubePlayer'
import './styles/Intro.css'
import BetaInfo from './Homepage/BetaInfo'
import { CONFIG } from '../config'
import { METAMASK_NETWORKS } from '../constants/metamask'
import { setDocumentTitle } from '../helpers/utils'

class Intro extends React.PureComponent<{}> {
  componentDidMount () {
    setDocumentTitle(null)
  }

  render () {
    return (
      <div>
        {
          CONFIG.ETHEREUM_NETWORK !== METAMASK_NETWORKS.main &&
          <BetaInfo />
        }
        <div className="container">
          <div className="Intro__video">
            <YoutubePlayer videoId="qRbZ_wcWzL0" />
          </div>
        </div>
      </div>
    )
  }
}

export default Intro
