import React from 'react'
import BiddingCanvasExtras from './BiddingCanvasExtras'
import CanvasPreview from './CanvasPreview'

class CanvasPreviewBidding extends React.PureComponent {
  render() {
    return (
      <div>
        <CanvasPreview
          canvasId={this.props.canvasId}
          extraRender={() => <BiddingCanvasExtras canvasId={this.props.canvasId} />}
        />
      </div>
    );
  }
}

CanvasPreviewBidding.propTypes = {}
CanvasPreviewBidding.defaultProps = {}

export default CanvasPreviewBidding
