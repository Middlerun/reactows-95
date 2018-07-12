import React, { Component } from 'react'
import styled from 'styled-components'

import Window from '../components/window/Window'
import RidgedButton from '../atoms/RidgedButton'
import focusButtonListener from '../util/focusButtonListener'

const MessageWrapper = styled.div`
  padding: 22px 10px 12px 10px;
  text-align: center;
  
  > * + * {
    margin-top: 25px;
  }
`

class Dialog extends Component {
  componentDidMount() {
    this.keyListener = focusButtonListener(this, this.props.onRequestClose, { which: 13 })
  }

  componentWillUnmount() {
    this.keyListener.remove()
  }

  render() {
    const {
      children,
      initialGeometry,
      onRequestClose,
      ...props
    } = this.props

    const windowInitialGeometry = {
      width: 296,
      height: 123,
      ...initialGeometry
    }

    return (
      <Window
        {...props}
        initialGeometry={windowInitialGeometry}
        minimizable={false}
        resizable={false}
      >
        <MessageWrapper>
          <div>
            {children}
          </div>
          <div>
            <RidgedButton
              strongBorder
              standardFormat
              autoFocus
              onClick={onRequestClose}
            >
              OK
            </RidgedButton>
          </div>
        </MessageWrapper>
      </Window>
    )
  }
}

export default Dialog
