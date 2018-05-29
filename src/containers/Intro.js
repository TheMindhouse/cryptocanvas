// @flow
import * as React from 'react'
import { YoutubePlayer } from '../components/Small/YoutubePlayer'
import './styles/Intro.css'
import { URLHelper } from '../helpers/URLhelper'
import { Link } from 'react-router-dom'
import { Button, Icon } from 'antd'

const Intro = () => {
  return (
    <div>
      <div className="container">
        <div className="Intro__video">
          <YoutubePlayer videoId="qRbZ_wcWzL0" playing />
        </div>
        <div className="text-center">
          <Link to={URLHelper.home}>
            <Button type="primary" size="large" className="Intro__button">
              Get started <Icon type="arrow-right" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

Intro.defaultProps = {}

export default Intro
