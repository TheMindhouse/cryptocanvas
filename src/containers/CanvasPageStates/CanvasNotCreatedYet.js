// @flow
import * as React from 'react'
import CanvasStagePlaceholder from '../../components/Canvas/CanvasStagePlaceholder'
import { Row } from 'antd'
import { URLHelper } from '../../helpers/URLhelper'
import { Link } from 'react-router-dom'

type Props = {
  canvasId: number,
}

class CanvasNotCreatedYet extends React.PureComponent<Props> {
  static defaultProps = {}

  render() {
    return (
      <Row className="CanvasPage" type="flex" justify="space-between" align="top">
        <CanvasStagePlaceholder hideSpinner />
        <div className="CanvasSidebar">
          <h2 className="CanvasSidebar__title">Canvas #{this.props.canvasId}</h2>
          <h3 className="CanvasSidebar__status">Not Created Yet</h3>
          <br />
          <br />
          <p>
            Go to <Link to={URLHelper.home}>homepage</Link> to create a new canvas
            or see which canvases are currently active.
          </p>
        </div>
      </Row>
    )
  }
}

export { CanvasNotCreatedYet }
