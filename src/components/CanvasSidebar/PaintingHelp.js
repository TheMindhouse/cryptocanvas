// @flow
import * as React from 'react'
import { Modal } from 'antd'
import { URLHelper } from '../../helpers/URLhelper'
import { Link } from 'react-router-dom'

type Props = {}

class PaintingHelp extends React.PureComponent<Props> {
  static defaultProps = {}

  showModal = () => {
    Modal.info({
      title: 'How can I place a pixel?',
      width: 600,
      maskClosable: true,
      content: (
        <div>
          <p>CryptoCanvas is based on the <b>Ethereum blockchain</b> technology. To get started you need:</p>
          <ul>
            <li>a desktop version of Chrome or Firefox</li>
            <li>
              <b>MetaMask</b> - a browser extension allowing you to interact with the blockchain,
              see <a href={URLHelper.help.installingMetamask}>Installing MetaMask</a>
            </li>
            <li>
              <b>Ether</b> - a digital cryptocurrency powering transactions like painting or trading,
              see <a href={URLHelper.help.gettingEther}>Getting Ether</a>
            </li>
          </ul>
          <p>
            <b>You can find more information about how CryptoCanvas works at the <a href={URLHelper.about}>About page</a>.</b>
          </p>
        </div>
      ),
      onOk () {},
    })
  }

  render () {
    return (
      <Link to="#" onClick={this.showModal}>How can I place a pixel?</Link>
    )
  }
}

export { PaintingHelp }
