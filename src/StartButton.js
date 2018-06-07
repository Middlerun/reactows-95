import React, { Component } from 'react'
import styled from 'styled-components'

import RidgedGreyButton from './atoms/RidgedGreyButton'

const StyledStartButton = RidgedGreyButton.extend`
  padding: 0 3px;
  font-weight: bold;
`

class StartButton extends Component {
  render() {
    const { onClick } = this.props

    return (
      <StyledStartButton className="ninefive-StartButton" onClick={onClick}>
        <span>🔥 Start</span>
      </StyledStartButton>
    )
  }
}

export default StartButton
