import React from 'react'
import withWeb3 from '../hoc/withWeb3'

const Test = (props) => {
  return (
    <div>
      <p>test</p>
      {props.account}
    </div>
  )
}

Test.propTypes = {}
Test.defaultProps = {}

export default withWeb3(Test)
