// @flow
import * as React from 'react'
import './styles/Intro.css'
import BetaInfo from './Homepage/BetaInfo'
import { CONFIG } from '../config'
import { METAMASK_NETWORKS } from '../constants/metamask'
import { setDocumentTitle } from '../helpers/utils'
import { Button, Col, Icon, Progress, Row } from 'antd'
import pixelBg from '../assets/images/pixels.png'
import photoMarilyn from '../assets/images/home-marilyn.png'
import photoArtworks from '../assets/images/home-gallery.png'
import bgGradient from '../assets/images/bg-gradient.png'
import iconCreate from '../assets/images/icon-create.png'
import iconTrade from '../assets/images/icon-trade.png'
import iconCollect from '../assets/images/icon-collect.png'
import iconSecure from '../assets/images/icon-secure.png'
import iconPerson from '../assets/images/icon-person.png'
import iconCode from '../assets/images/icon-code.png'
import poweredByEthereum from '../assets/images/powered-by-ethereum.png'
import { URLHelper } from '../helpers/URLhelper'
import { Link } from 'react-router-dom'

class Intro extends React.PureComponent<{}> {
  componentDidMount () {
    setDocumentTitle(null)
  }

  render () {
    return (
      <div>
        <section className="IntroSection--Welcome" style={{ backgroundImage: `url(${pixelBg})` }}>
          <div className="container text-center">
            <Row type="flex" align="top" gutter={50}>
              <Col xs={{ span: 24 }} md={{ span: 8 }}>
                <img src={iconCreate} className="Intro__Icon--large" alt=""/>
                <p className="Intro__Header--large"><b>Create.</b></p>
                <p className="Intro__text">
                  Co-create a painting and have a share of the royalties.
                </p>
              </Col>
              <Col xs={{ span: 24 }} md={{ span: 8 }}>
                <img src={iconTrade} className="Intro__Icon--large" alt=""/>
                <p className="Intro__Header--large"><b>Trade.</b></p>
                <p className="Intro__text">
                  Buy and sell paintings on the open marketplace.
                </p>
              </Col>
              <Col xs={{ span: 24 }} md={{ span: 8 }}>
                <img src={iconCollect} className="Intro__Icon--large" alt=""/>
                <p className="Intro__Header--large"><b>Collect.</b></p>
                <p className="Intro__text">
                  Cryptographically prove ownership of the artworks in your collection.
                </p>
              </Col>
            </Row>

            <div style={{ marginTop: 60 }}>
              {
                CONFIG.ETHEREUM_NETWORK !== METAMASK_NETWORKS.main &&
                <Link to={URLHelper.getStarted}>
                  <Button type="primary" size="large" className="Intro__button">
                    Get started for free <Icon type="arrow-right" />
                  </Button>
                </Link>
              }
              {
                CONFIG.ETHEREUM_NETWORK === METAMASK_NETWORKS.main &&
                <Link to={URLHelper.home}>
                  <Button type="primary" size="large" className="Intro__button">
                    Get started <Icon type="arrow-right" />
                  </Button>
                </Link>
              }
            </div>
          </div>
        </section>

        <section className="IntroSection--no-padding containerWrapper">
          <div className="container IntroSectionParticipate">
            <img src={photoMarilyn} className="IntroSectionParticipate__photo" alt=""/>
            <div className="IntroSectionParticipate__content" style={{ backgroundImage: `url(${bgGradient})` }}>
              <p className="Intro__Header--medium">
                <b>Participate in<br />
                  Community Painting.</b>
              </p>
              <p className="Intro__text">
                A palm tree on a beach, a stick figure, Marilyn Monroe’s eyebrow or maybe the whole Mona Lisa? Why not!
                Paint whatever you like and how many pixels you like!
              </p>
              <p className="Intro__text">
                You don’t have to be an artist to create. You can invite your friends and paint something together. Just
                have fun!
              </p>
            </div>
          </div>
        </section>

        <section className="IntroSectionGetRewarded">
          <div className="container text-center">
            <p className="Intro__Header--medium">
              <b>Get Rewarded For Creating.</b>
            </p>
            <p className="Intro__text">
              Receive a share of the royalties from each artwork you co-painted:
            </p>
            <Row type="flex" align="middle" justify="center">
              <Col xs={24} md={10} lg={8}>
                <div className="IntroSectionGetRewarded-Charts">
                  <Progress type="circle" percent={96.1} strokeWidth={8} format={() => 'Ξ'} />
                </div>
                <p className="Intro__Header--small"><b>96.1%</b></p>
                <p className="Intro__text">from an artwork auction sale</p>
              </Col>
              <Col xs={24} md={10} lg={8}>
                <div className="IntroSectionGetRewarded-Charts">
                  <Row type="flex" justify="center" className="IntroSectionGetRewarded-Charts__Small">
                    <Progress type="circle" percent={6.1} width={65} format={() => 'Ξ'} />
                    <Progress type="circle" percent={6.1} width={65} format={() => 'Ξ'} />
                  </Row>
                  <Row type="flex" justify="center" className="IntroSectionGetRewarded-Charts__Small">
                    <Progress type="circle" percent={6.1} width={65} format={() => 'Ξ'} />
                    <Progress type="circle" percent={6.1} width={65} format={() => 'Ξ'} />
                  </Row>
                </div>
                <p className="Intro__Header--small"><b>6.1%</b></p>
                <p className="Intro__text"><b>every time</b> the artwork is traded</p>
              </Col>
            </Row>
          </div>
        </section>

        <section className="IntroSectionBuyArtworks containerWrapper">
          <div className="container text-center">
            <p className="Intro__Header--medium">
              <b>Buy Unique Pixel Artworks.</b>
            </p>
            <img src={photoArtworks} className="IntroSectionBuyArtworks__Gallery" alt=""/>
            <Row type="flex" justify="center">
              <Col xs={24} md={12} lg={10}>
                <p className="Intro__text">
                  Make a bid for a finished artwork on an open auction or send an offer to the artwork’s owner.
                </p>
                <p className="Intro__text">
                  What you pay for is not only a proof of ownership but an <b>entire artwork on the blockchain!</b>
                </p>
              </Col>
            </Row>
          </div>
        </section>

        <section className="IntroSectionEthereum container text-center">
          <a href="https://ethereum.org" target="_blank" rel="noopener noreferrer">
            <img src={poweredByEthereum} className="IntroSectionEthereum__Logo" alt=""/>
          </a>
        </section>

        <section className="containerWrapper">
          <div className="container">
            <Row type="flex" align="middle" justify="center">
              <Col xs={22} sm={14} md={12} lg={24}>
                <Row type="flex" align="middle" justify="center" gutter={120}>
                  <Col xs={24} lg={8}>
                    <Row type="flex" align="middle" justify="center" className="IntroSectionBlockchainFeature">
                      <img src={iconSecure} className="IntroSectionBlockchainFeature__Icon" alt=""/>
                      <div>
                        <p className="Intro__Header--small">
                          <b>Secure</b>
                        </p>
                        <p style={{ margin: 0 }}>
                          Every bit of information
                          stored forever on-chain.
                        </p>
                      </div>
                    </Row>
                  </Col>
                  <Col xs={24} lg={8}>
                    <Row type="flex" align="middle" justify="center" className="IntroSectionBlockchainFeature">
                      <img src={iconPerson} className="IntroSectionBlockchainFeature__Icon" alt=""/>
                      <div>
                        <p className="Intro__Header--small">
                          <b>Anonymous</b>
                        </p>
                        <p style={{ margin: 0 }}>
                          No registration, no log in.
                          Just pure blockchain.
                        </p>
                      </div>
                    </Row>
                  </Col>
                  <Col xs={24} lg={8}>
                    <Row type="flex" align="middle" justify="center" className="IntroSectionBlockchainFeature">
                      <img src={iconCode} className="IntroSectionBlockchainFeature__Icon" alt=""/>
                      <div>
                        <p className="Intro__Header--small">
                          <b>Open-source</b>
                        </p>
                        <p style={{ margin: 0 }}>
                          Verified and publicly
                          available source code.
                        </p>
                      </div>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </section>

        {
          CONFIG.ETHEREUM_NETWORK !== METAMASK_NETWORKS.main &&
          <BetaInfo />
        }
      </div>
    )
  }
}

export default Intro
