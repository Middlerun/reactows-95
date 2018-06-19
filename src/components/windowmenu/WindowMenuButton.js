import React, { Component, Fragment } from 'react'
import styled, { css } from 'styled-components'
import { RootCloseWrapper } from 'react-overlays'

import WindowMenu from './WindowMenu'
import MenuOverlay from '../MenuOverlay'

import underlinedLabel from '../../util/underlinedLabel'

const Root = styled.div`
  position: relative;
  display: inline-block;
  margin-top: -1px;
  margin-bottom: -2px;
`

const StyledWindowMenuButton = styled.button`
  border: 0;
  outline: 0;
  height: 18px;
  padding: 0 6px;
  background-color: transparent;
  user-select: none;
  white-space: nowrap;
  
  ${({pressed}) => pressed && css`
    background-color: #000080;
    color: white;
  `}
  
  u {
    text-decoration: underline;
  }
  
  ::-moz-focus-inner {
    border: 0;
  }
`

class WindowMenuButton extends Component {
  constructor() {
    super()
    this.state = { windowMenuOpen: false }
  }

  toggleWindowMenuOpen = () => {
    this.setState(state => ({
      windowMenuOpen: !state.windowMenuOpen,
    }))
  }

  closeWindowMenu = () => {
    this.setState({ windowMenuOpen: false })
  }

  render() {
    const { label, underline, items } = this.props
    const { windowMenuOpen } = this.state

    return <RootCloseWrapper onRootClose={this.closeWindowMenu} event="mousedown">
      <Root ref={el => this.root = el}>
        <StyledWindowMenuButton
          onClick={this.toggleWindowMenuOpen}
          pressed={windowMenuOpen}
        >
          {underlinedLabel(label, underline)}
        </StyledWindowMenuButton>

        {windowMenuOpen && <MenuOverlay
          show={windowMenuOpen}
          placement="bottom"
          alignEdge="left"
          container={this}
        >
          <WindowMenu items={items} onItemSelected={this.closeWindowMenu}/>
        </MenuOverlay>}
      </Root>
    </RootCloseWrapper>
  }
}

export default WindowMenuButton
