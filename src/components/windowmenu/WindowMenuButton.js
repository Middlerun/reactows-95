import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

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
  render() {
    const { label, underline, items, menuOpen, onMouseEnterButton, onItemSelected, onClick } = this.props

    return <Root ref={el => this.root = el}>
      <StyledWindowMenuButton
        onClick={onClick}
        onMouseEnter={onMouseEnterButton}
        pressed={menuOpen}
      >
        {underlinedLabel(label, underline)}
      </StyledWindowMenuButton>

      {menuOpen && <MenuOverlay
        show={menuOpen}
        placement="bottom"
        alignEdge="left"
        container={this}
      >
        <WindowMenu items={items} onItemSelected={onItemSelected}/>
      </MenuOverlay>}
    </Root>
  }
}

WindowMenuButton.propTypes = {
  label: PropTypes.string.isRequired,
  underline: PropTypes.number,
  items: PropTypes.array,
  menuOpen: PropTypes.bool,
  onMouseEnterButton: PropTypes.func,
  onItemSelected: PropTypes.func,
  onClick: PropTypes.func,
}

export default WindowMenuButton
