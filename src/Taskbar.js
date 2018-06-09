import React, { Component } from 'react'
import styled from 'styled-components'

import GreyBox from './atoms/GreyBox'
import StartButton from './StartButton'
import SystemTray from './SystemTray'

import borderImage from './img/taksbar-top.png'

const Root = GreyBox.extend`
  width: 100%;
  height: 28px;
  border-top-width: 2px;
  border-top-style: solid;
  border-image: url('${borderImage}') 2 stretch;
  padding: 2px;
  display: flex;
  align-items: stretch;
  z-index: 2;
`

const Inner = styled.div`
  display: flex;
  justify-content: flex-start;
  flex: 1;
  padding: 0 4px;
  
  > * {
    flex: 1;
    width: 0;
    max-width: 160px;
  
    + * {
      margin-left: 3px;
    }
  }
`

class Taskbar extends Component {
  render() {
    const { onStartButtonClick, children } = this.props

    return (
      <Root className="ninefive-Taskbar">
        <StartButton onClick={onStartButtonClick}/>
        <Inner>
          {children}
        </Inner>
        <SystemTray/>
      </Root>
    )
  }
}

export default Taskbar
