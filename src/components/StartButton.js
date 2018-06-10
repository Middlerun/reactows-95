import React, { Component } from 'react'

import RidgedButton from '../atoms/RidgedButton'

const StyledStartButton = RidgedButton.extend`
  padding: 0 3px;
  font-weight: bold;
  white-space: nowrap;
`

class StartButton extends Component {
  render() {
    const { onClick } = this.props

    return (
      <StyledStartButton className="reactows95-StartButton" onClick={onClick}>
        <span>🔥 Start</span>
      </StyledStartButton>
    )
  }
}

export default StartButton
