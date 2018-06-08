// @flow
import React from 'react'
import { Input, Modal, message } from 'antd'
import { TermsInfo } from '../Small/TermsInfo'
import type { WithModal } from '../../types/WithModal'

type Props = {
  modal: WithModal,
  onModalSubmit: (string) => void,
}

type State = {
  name: string,
}

const CANVAS_NAME_MAX_LENGTH = 24

class SetCanvasNameModal extends React.PureComponent<Props, State> {
  state = {
    name: ''
  }

  isValidName = () => this.state.name.length <= CANVAS_NAME_MAX_LENGTH

  onChange = (event: any) => {
    const name = event.currentTarget.value
    this.setState({ name })
  }

  onSubmit = () => {
    if (!this.isValidName()) {
      message.error(`Maximum length of a canvas name is ${CANVAS_NAME_MAX_LENGTH} chars`)
      return
    }
    this.props.onModalSubmit(this.state.name)
  }

  render () {
    return (
      <Modal
        title="Change Canvas Name"
        visible={this.props.modal.isVisible}
        onOk={this.onSubmit}
        onCancel={this.props.modal.close}
        okText="Submit Canvas Name"
      >
        <p>As the owner of this Canvas you can change its name.</p>
        <p className="text-smaller">
          Tip: Submit empty string to change the name to the default one.
        </p>
        <Input type="text"
               placeholder="Enter new name"
               onChange={this.onChange}
               onPressEnter={this.onSubmit} />
        <p className={`text-smaller ${!this.isValidName() ? 'text-error' : ''}`} style={{ textAlign: 'right' }}>
          {this.state.name.length} / {CANVAS_NAME_MAX_LENGTH}
        </p>
        <TermsInfo />
      </Modal>
    )
  }
}

export { SetCanvasNameModal }
