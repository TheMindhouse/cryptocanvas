// @flow
import * as React from 'react'

type Props = {}

const FbMessenger = (props: Props) => {
  return (
    <div>
      <div className="fb-customerchat"
           attribution="setup_tool"
           page_id="1882641792033739"
           theme_color="#0084ff"
           logged_in_greeting="Hi! How can I help you?"
           logged_out_greeting="Hi! How can I help you?">
      </div>
    </div>
  )
}

FbMessenger.defaultProps = {}

export default FbMessenger
