import React, { Component } from 'react'
import styled from 'styled-components'

import GreyBox from './atoms/GreyBox'
import StartButton from './StartButton'
import SystemTray from './SystemTray'

const borderImage = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAYAAABhYU3QAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4gYHCjkuWgrYkwAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAAXSURBVAjXY7x///5/BiIA4////4lSCAC5BAebe4dEZAAAAABJRU5ErkJggg==`

const Root = GreyBox.extend`
  width: 100%;
  height: 28px;
  border-top-width: 2px;
  border-top-style: solid;
  border-image: url('${borderImage}') 2 stretch;
  padding: 2px;
  display: flex;
  align-items: stretch;
`

const Inner = styled.div`
  flex: 1;
`

class Taskbar extends Component {
  render() {
    const { onStartButtonClick } = this.props

    return (
      <Root className="ninefive-Taskbar">
        <StartButton onClick={onStartButtonClick}/>
        <Inner>
          {this.props.children}
        </Inner>
        <SystemTray/>
      </Root>
    )
  }
}

export default Taskbar
