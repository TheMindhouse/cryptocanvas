// @flow
import * as React from 'react'
import './styles/IntroNew.css'
import { setDocumentTitle } from '../helpers/utils'
import { Col, Icon, Row } from 'antd'
import { URLHelper } from '../helpers/URLhelper'
import CanvasPage from './CanvasPage'
import discordLogo from '../assets/images/discord.svg'
import { SOCIAL_LINKS } from '../constants'

class Intro extends React.PureComponent<{}> {
  componentDidMount () {
    setDocumentTitle(null)
  }

  render () {
    return (
      <div>
        <CanvasPage canvasId={0} />

        <section>
          <div className="container">
            <p className="Intro__Header--large">
              <b>Completely on-chain collaborative pixel painting</b>
            </p>
            <p className="Intro__text">CryptoCanvas is the first ever collectible, collaborative pixel artwork
              to-be-created by the CryptoCanvas community. Each canvas is 48x48 pixels in size and has multiple authors,
              who create a unique piece of art by collaborating together. The completed artwork will be put up for
              auction and when sold, auction proceeds will be distributed among all contributors evenly, depending on
              how many pixels they contributed to the canvas.</p>
            <br />
            <p className="Intro__Header--large">
              <b>Earn by contributing</b>
            </p>
            <p className="Intro__text">By contributing to the artwork you are not only digitally signing your address to
              each and every pixel you paint onto the blockchain for eternity - you are also entitled to a percentage of
              the proceeds from the auction of the final piece as well as a portion of every sale afterwards.</p>
            <div className="text-center">
              <p className="Intro__text">
                <b>When the completed canvas is auctioned:</b>
              </p>
              <p className="Intro__text">
                <b>96.1%</b> of auction proceeds will be distributed amongst contributors.
              </p>
              <p className="Intro__text">
                <b>Every sale of the canvas afterwards:</b>
              </p>
              <p className="Intro__text">
                <b>6.1%</b> of sale proceeds will be distributed amongst contributors.
              </p>
            </div>
          </div>
        </section>

        <section className="containerWrapper" style={{ margin: '50px 0' }}>
          <div className="container">
            <p className="Intro__Header--large">
              <b>How can I contribute?</b>
            </p>
            <Row type="flex" align="top" gutter={50} className="text-center">
              <Col xs={{ span: 24 }} md={{ span: 8 }} className="ContributeStep">
                <div className="ContributeStep__Number">1</div>
                <p className="Intro__text">
                  Choose a color and select the pixels you would like to paint.
                </p>
              </Col>
              <Col xs={{ span: 24 }} md={{ span: 8 }} className="ContributeStep">
                <div className="ContributeStep__Number">2</div>
                <p className="Intro__text">Submit your pixel selection to the blockchain.</p>
              </Col>
              <Col xs={{ span: 24 }} md={{ span: 8 }} className="ContributeStep">
                <div className="ContributeStep__Number">3</div>
                <p className="Intro__text">On canvas auction, you will receive a % of the proceeds.</p>
              </Col>
            </Row>
          </div>
        </section>


        <section style={{ margin: '50px 0 40px' }}>
          <div className="container">
            <Row type="flex" align="middle" gutter={50} className="text-center">
              <Col xs={{ span: 24 }} md={{ span: 8, offset: 4 }}>
                <a
                  href={SOCIAL_LINKS.Discord}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={discordLogo}
                    alt="Discord"
                    style={{ width: 250, maxWidth: '80%', opacity: 0.8 }}
                  />
                </a>
              </Col>
              <Col xs={{ span: 24 }} md={{ span: 8 }}>
                <a
                  href={SOCIAL_LINKS.Twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: 30 }}
                >
                  <Icon type="twitter" style={{ marginRight: 10 }} />
                  Twitter
                </a>
              </Col>
            </Row>
          </div>
        </section>


        <section>
          <div className="container">
            <p className="Intro__Header--large">
              <b>More FAQs</b>
            </p>
            <h2 className="Intro__Header--medium"><b>When was CryptoCanvas created?</b></h2>
            <p className="Intro__text">
              CryptoCanvas development started in March 2018 by the team of two digital nomads traveling through Asia.
              It was inspired by the <a href="https://www.wikiwand.com/en/Place_(Reddit)" target="_blank">Reddit
              Place</a> experiment from 2017, when over 1 million Reddit users collaborated on creating an artwork
              together, each of them painting just a few pixels on a big canvas.
            </p>
            <p className="Intro__text">
              The project launched four months later in July 2018, when <a
              href="https://etherscan.io/tx/0x6f8dd5698ba7de0b9897d062944765b255592f45950fe1fd46c951628c99d6ac"
              target="_blank">the official contract</a> was created.
            </p>
            <p className="Intro__text">
              The first pixel on Canvas #0 was set on <a
              href="https://etherscan.io/tx/0x9e0ff088262cba7d1f00c8afc82a86e36eee00c1446f3a485a54939809ddbb21"
              target="_blank">July 9th, 2018</a>.
            </p>

            <h2 className="Intro__Header--medium"><b>How much does it cost to paint a pixel?</b></h2>
            <p className="Intro__text">Essentially, it's free. We don't charge any fees for creating canvases, placing
              pixels or making bids.
              The only thing you need to cover is a transaction fee required by the Ethereum network.</p>

            <h2 className="Intro__Header--medium"><b>What is stored on the blockchain?</b></h2>
            <p className="Intro__text">To put it simply: everything. Unlike other projects, we store all pieces of
              information on the
              blockchain. That includes information about every single pixel of the canvas and its author. Storing this
              amount of data on the blockchain would be very expensive for one person, but with the collaborative
              effort, it becomes possible.
            </p>

            <h2 className="Intro__Header--medium"><b>Who holds copyright to a canvas?</b></h2>
            <p className="Intro__text">Each finished canvas has its owner, determined during the Initial Bidding phase.
              The current owner holds
              all copyright to the canvas. Once the owner transfers the ownership of the canvas to another user, the
              copyright is passed to the new owner along with the canvas.</p>
            <p className="Intro__text">CryptoCanvas fans are able to use images of the canvases in non-commercial
              purposes.</p>
            <p className="Intro__text">For more information please see our <a href={URLHelper.about}>about</a> page</p>
          </div>
        </section>
      </div>
    )
  }
}

export default Intro
