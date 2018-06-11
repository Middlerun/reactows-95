import React, { Component } from 'react'
import styled from 'styled-components'

import RidgedButton from '../atoms/RidgedButton'

import logo from '../img/logo-small.png'

const StyledStartButton = RidgedButton.extend`
  padding: 0 3px;
  font-weight: bold;
  white-space: nowrap;
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
`

const LogoImage = styled.img`
  vertical-align: bottom;
`

class StartButton extends Component {
  render() {
    const { onClick } = this.props

    return (
      <StyledStartButton className="reactows95-StartButton" onClick={onClick}>
        <span><LogoImage src={logo}/> Start</span>
      </StyledStartButton>
    )
  }
}

export default StartButton
