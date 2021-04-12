// @flow
import * as React from 'react'
import { Col, Divider, Icon, Row } from 'antd'
import { URLHelper } from '../../helpers/URLhelper'
import { Link } from 'react-router-dom'
import './styles/Footer.css'
import discordLogo from '../../assets/images/discord.svg'
import { SOCIAL_LINKS } from '../../constants'

type Props = {}

class Footer extends React.PureComponent<Props> {
  static defaultProps = {}

  render () {
    return (
      <Row type="flex" align="middle" className="container Footer">
        <Divider />
        <Col xs={24} sm={24} md={8}>
          <nav className="Footer__nav">
            <Link to={URLHelper.about}>About</Link>
            <Link to={URLHelper.help.page}>Help</Link>
            <Link to={URLHelper.terms}>Terms of Use</Link>
            <Link to={URLHelper.contact}>Contact</Link>
          </nav>
        </Col>
        <Col xs={24} sm={24} md={8} style={{ textAlign: 'center' }}>
          Created with &hearts; in 2018
        </Col>
        <Col xs={24} sm={24} md={8} style={{ textAlign: 'right' }}>
          <a
            href={SOCIAL_LINKS.Discord}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={discordLogo}
              alt="Discord"
              style={{ width: 100, opacity: 0.6 }}
            />
          </a>
          <a
            href={SOCIAL_LINKS.Twitter}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 16, marginLeft: 20 }}
          >
            <Icon type="twitter" style={{ fontSize: 20, marginRight: 10 }} />
            Twitter
          </a>
        </Col>
      </Row>
    )
  }
}

export { Footer }
