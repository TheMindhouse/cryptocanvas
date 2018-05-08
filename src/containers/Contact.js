// @flow
import * as React from 'react'
import Obfuscate from 'react-obfuscate'

const Contact = () => {
  return (
    <div>
      <div className="containerWrapper" style={{ marginBottom: 50 }}>
        <div className="container">
          <h2><b>Contact</b></h2>
          <h2>
            If you have any thoughts, questions or suggestions,<br />
            you are welcome to contact us at <b><Obfuscate email='team@mindhouse.io' /></b>
          </h2>
        </div>
      </div>
      <div className="container">
        <p>It's that simple.</p>
      </div>
    </div>
  )
}

export default Contact
