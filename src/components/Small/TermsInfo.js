// @flow
import * as React from 'react'
import { URLHelper } from '../../helpers/URLhelper'
import './styles/TermsInfo.css'

type Props = {
  style?: Object,
}

const TermsInfo = (props: Props) => {
  return (
    <p className="TermsInfo" style={props.style}>
      By sending a transaction you accept <a href={URLHelper.terms} target="_blank">Terms of Use</a>.
    </p>
  )
}

export { TermsInfo }
