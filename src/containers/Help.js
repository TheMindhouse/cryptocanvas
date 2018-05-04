// @flow
import * as React from 'react'
import { Anchor, Col, Row } from 'antd'
import { URLHelper } from '../helpers/URLhelper'
import { Link } from 'react-router-dom'
import { YoutubePlayer } from '../components/Small/YoutubePlayer'

type Props = {}

class Help extends React.PureComponent<Props> {
  static defaultProps = {}

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
          <Col span={8}>
            <Anchor style={{ paddingTop: 20 }}>
              <Anchor.Link href="#installing-metamask" title="Installing MetaMask" />
              <Anchor.Link href="#getting-ether" title="Getting Ether" />
              <Anchor.Link href="#sending-eth-to-metamask" title="Sending ETH to MetaMask" />
            </Anchor>
          </Col>
          <Col span={16}>
            <h2 id="installing-metamask"><b>Installing MetaMask</b></h2>
            <p>
              To use CryptoCanvas, you will need to install MetaMask, a browser extension, which connects your browser
              to the Ethereum network. You will also need to put some Ether in it to play with the canvases.
            </p>
            <p>
              <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer">
                <b>Download MetaMask on the Official MetaMask Website.</b>
              </a>
            </p>
            <p>
              Note: A digital wallet like MetaMask acts like a bank account&mdash;treat it with respect and make sure
              you don’t forget your password or the seed words.
            </p>
            <YoutubePlayer videoId="6Gf_kRE4MJU" />
            <br />

            <h2 id="getting-ether"><b>Getting Ether</b></h2>
            <p>Ether cryptocurrency (ETH) fuels all the operations performed on the Ethereum network. To paint, make
              bids and trade the canvases you will need a small amount of Ether to send transactions to the network. The
              cost of sending a transaction should not exceed a couple of cents.</p>
            <p>
              <b>For U.S. citizens only:</b><br />
              You can buy Ether directly in MetaMask. Just press the “Buy” button under your account address.
            </p>
            <p>
              <b>For everyone else:</b><br />
              You will need to purchase ETH from <a href="https://blockgeeks.com/guides/best-cryptocurrency-exchanges"
                                                    target="_blank" rel="noopener noreferrer">an exchange</a>,
              and then transfer the ETH from your exchange wallet to
              your MetaMask wallet. Unfortunately, you cannot interact with CryptoCanvas with only an exchange account.
            </p>
            <p>
              You cannot use traditional currencies like USD or EUR to play with CryptoCanvas — it needs to be converted
              into ETH first.
            </p>

            <h2 id="sending-eth-to-metamask"><b>Sending ETH to MetaMask</b></h2>
            <p>
              <b>For U.S. citizens only:</b><br />
              You can buy ETH directly from the MetaMask using the Coinbase widget and it will appear in your MetaMask
              wallet. It’s a very simple and quick method to get started.
            </p>
            <p>
              <b>For everyone else:</b><br />
              You need to buy ETH from an exchange using normal fiat currency, such as USD or EUR, and then transfer it
              to your MetaMask wallet.<br />
              Once you’ve bought Ether on an exchange, copy your MetaMask address by clicking on the three large dots
              next to your account in the MetaMask widget, and then select “Copy Address to clipboard”. Go to your
              exchange, select your ETH wallet and find a “send” button. Paste the MetaMask address in the box and enter
              the amount to transfer. Make sure the address you pasted is the correct address from MetaMask! After
              making the transfer, Ether should show up on your MetaMask wallet and you’re good to paint your first
              canvas!
            </p>
          </Col>
        </Row>
      </div>
    )
  }
}

export { Help }
