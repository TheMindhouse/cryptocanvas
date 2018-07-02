// @flow
import * as React from 'react'
import { Anchor, Col, Row } from 'antd'
import { URLHelper } from '../helpers/URLhelper'
import { Link } from 'react-router-dom'
import { YoutubePlayer } from '../components/Small/YoutubePlayer'
import { setDocumentTitle } from '../helpers/utils'
import { FbMessengerHelper } from '../helpers/FbMessengerHelper'

type Props = {}

class HelpBeta extends React.PureComponent<Props> {
  static defaultProps = {}

  componentDidMount () {
    setDocumentTitle('Help')
    FbMessengerHelper.showHelpDialog()
  }

  render () {
    return (
      <div>
        <div className="containerWrapper" style={{ marginBottom: 50 }}>
          <div className="container">
            <h1><b>Help</b></h1>
            <h3>
              This page is to help you solve more detailed issues.<br />
              If you're looking for a general overview of how CryptoCanvas works,
              please see <Link to={URLHelper.about}>About page</Link>
            </h3>
          </div>
        </div>
        <Row className="container About">
          <Col xs={24} sm={24} md={8} className="About__nav">
            <Anchor style={{ paddingTop: 20 }}>
              <Anchor.Link href="#installing-metamask" title="Installing MetaMask" />
              <Anchor.Link href="#getting-ether" title="Getting Test Ether" />
            </Anchor>
          </Col>
          <Col xs={24} sm={24} md={16}>
            <h2 id="installing-metamask"><b>Installing MetaMask</b></h2>
            <p>
              To use CryptoCanvas, you will need to install MetaMask, a browser extension, which connects your browser
              to the Ethereum network. You will also need to put some free Test Ether in it to play with the canvases.
            </p>
            <p>
              <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer">
                <b>Download MetaMask on the Official MetaMask Website.</b>
              </a>
            </p>
            <p>
              <b>Because this is a BETA version, connect your MetaMask to Rinkeby Test Network instead of Main Network.</b>
            </p>
            <YoutubePlayer videoId="6Gf_kRE4MJU" />
            <br />

            <h2 id="getting-ether"><b>Getting Test Ether</b></h2>
            <p>
              Ether cryptocurrency (ETH) fuels all the operations performed on the Ethereum network. In live
              version of CryptoCanvas you will need a small amount of Ether to make operations such as painting,
              making bids and trading canvases.
            </p>

            <p>
              BETA version uses Test Ether instead, because it's running on the Test Network.<br/>
              <b>You can get Test Ether completely free.</b>
            </p>

            <p><b>To get Test Ether:</b></p>
            <ol>
              <li>
                Go to <a href="https://faucet.rinkeby.io/" target="_blank" rel="noopener noreferrer">
                  https://faucet.rinkeby.io/
                </a>
              </li>
              <li>
                Make a public post with your wallet address on one of 3 supported social networks
                (Facebook, Google+ and Twitter). This prevents the site to be used by bots.
                You can remove the post once you get Test Ether.
              </li>
              <li>
                Back on the Rinkeby Faucet website, enter a link to the post you made and select maximum
                amount of Ether to receive. You'll receive it almost instantly but you'll need to wait 3 days to
                get more Ether again (or just use a different social account).
              </li>
              <li>
                Voilà! You should now have Test Ether to play with. Have fun!
              </li>
            </ol>
          </Col>
        </Row>
      </div>
    )
  }
}

export { HelpBeta }
