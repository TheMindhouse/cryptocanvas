// @flow
import * as React from 'react'
import { URLHelper } from '../../helpers/URLhelper'
import { cutAddress } from '../../helpers/strings'
import { Link } from 'react-router-dom'

type Props = {
  address: string,
}

class AccountAddressLink extends React.PureComponent<Props> {
  static defaultProps = {}
  
  render() {
    return (
      <Link to={URLHelper.account(this.props.address)}>{cutAddress(this.props.address)}</Link>
    )
  }
}

export { AccountAddressLink }
