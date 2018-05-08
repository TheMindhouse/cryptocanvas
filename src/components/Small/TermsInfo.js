// @flow
import * as React from 'react'
import { URLHelper } from '../../helpers/URLhelper'
import './styles/TermsInfo.css'

const TermsInfo = () => {
  return (
    <p className="TermsInfo">
      By sending a transaction you accept <a href={URLHelper.terms} target="_blank">Terms of Use</a>.
    </p>
  )
}

export { TermsInfo }
