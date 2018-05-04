// @flow
import * as React from 'react'
import ReactPlayer from 'react-player'
import './styles/YoutubePlayer.css'

type Props = {
  videoId: string,
}

class YoutubePlayer extends React.PureComponent<Props> {
  static defaultProps = {}
  
  render() {
    return (
      <div className='player-wrapper'>
        <ReactPlayer
          className='react-player'
          url={`https://www.youtube.com/watch?v=${this.props.videoId}`}
          width='100%'
          height='100%'
          controls
        />
      </div>
    )
  }
}

export { YoutubePlayer }
