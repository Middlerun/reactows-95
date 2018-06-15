import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import styled from 'styled-components'
import { Overlay } from 'react-overlays'

import StartMenu from './StartMenu'

import RidgedButton from '../atoms/RidgedButton'

import logo from '../img/logo-small.png'

const Root = styled.div`
  position: relative;
`

const StyledStartButton = RidgedButton.extend`
  height: 100%;
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
  constructor() {
    super()
    this.state = { startMenuOpen: false }
  }

  toggleStartMenuOpen = () => {
    this.setState(state => ({
      startMenuOpen: !state.startMenuOpen,
    }))
  }

  render() {
    const { startMenuItems } = this.props
    const { startMenuOpen } = this.state

    return <Root ref={el => this.root = el}>
      <StyledStartButton
        className="reactows95-StartButton"
        onClick={this.toggleStartMenuOpen}
        pressed={startMenuOpen}
      >
        <span><LogoImage src={logo}/> Start</span>
      </StyledStartButton>

      <Overlay
        show={startMenuOpen}
        onHide={this.toggleStartMenuOpen}
        placement="top"
        container={this}
        target={props => findDOMNode(this.root)}
        rootClose
        rootCloseEvent="mousedown"
      >
        <div style={{position: 'absolute'}}>
          <StartMenu items={startMenuItems}/>
        </div>
      </Overlay>
    </Root>
  }
}

export default StartButton
