import { CONFIG } from '../../config'
import { METAMASK_NETWORK_NAMES } from '../../constants/metamask'
import { Icon, Popover, Row } from 'antd'

const HeaderTestNet = () => (
  <Popover
    content={
      <Row type="flex" align="middle" className="HeaderTestnet__Popup">
        <Icon type="exclamation-circle" className="HeaderTestnet__WarningIcon" style={{ fontSize: 30 }}/>
        <span>
          This is only a TEST version of CryptoCanvas.<br />
          Go to <a href="https://cryptocanvas.art">cryptocanvas.art</a> for the real one.
        </span>
      </Row>
    }
    title=""
    placement="top"
    trigger="hover"
  >
    <span className="HeaderTestnet__Info">
      {METAMASK_NETWORK_NAMES[ CONFIG.ETHEREUM_NETWORK ]} <small><Icon type="question-circle-o" /></small>
    </span>
  </Popover>
)

export { HeaderTestNet }