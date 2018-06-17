import React, { Component } from 'react'
import styled from 'styled-components'
import { RootCloseWrapper } from 'react-overlays'

import StartMenu from './StartMenu'
import MenuOverlay from './MenuOverlay'

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

  closeStartMenu = () => {
    this.setState({ startMenuOpen: false })
  }

  render() {
    const { startMenuItems } = this.props
    const { startMenuOpen } = this.state

    return <RootCloseWrapper onRootClose={this.closeStartMenu} event="mousedown">
      <Root ref={el => this.root = el}>
        <StyledStartButton
          className="reactows95-StartButton"
          onClick={this.toggleStartMenuOpen}
          pressed={startMenuOpen}
        >
          <span><LogoImage src={logo}/> Start</span>
        </StyledStartButton>

        {startMenuOpen && <MenuOverlay
          show={startMenuOpen}
          placement="top"
          alignEdge="left"
          container={this}
        >
          <StartMenu items={startMenuItems} onItemSelected={this.closeStartMenu}/>
        </MenuOverlay>}
      </Root>
    </RootCloseWrapper>
  }
}

export default StartButton
