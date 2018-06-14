import React, { Component } from 'react'
import styled from 'styled-components'

import RidgedBox from '../atoms/RidgedBox'
import StartMenuItem, { Divider } from './StartMenuItem'

const Root = RidgedBox.extend`
  display: flex;
  padding: 1px;
  user-select: none;
`

const LeftStripe = styled.div`
  position: relative;
  width: 21px;
  background-color: #808080;
  overflow: hidden;
`

const OSNameText = styled.div`
  position: absolute;
  bottom: 0;
  transform: rotate(-90deg);
  transform-origin: 8px 8px;
  font-size: 20px;
`

const OSName1 = styled.span`
  color: #c0c0c0;
  font-weight: 900;
`

const OSName2 = styled.span`
  color: white;
`

const Main = styled.div`
  
`

class StartMenu extends Component {
  render() {
    return (
      <Root className="reactows95-StartMenu">
        <LeftStripe>
          <OSNameText>
            <OSName1>Reactows</OSName1><OSName2>95</OSName2>
          </OSNameText>
        </LeftStripe>
        <Main>
          <StartMenuItem>Programs</StartMenuItem>
          <StartMenuItem>Documents</StartMenuItem>
          <StartMenuItem>Settings</StartMenuItem>
          <StartMenuItem>Find</StartMenuItem>
          <StartMenuItem>Help</StartMenuItem>
          <StartMenuItem>Run...</StartMenuItem>
          <Divider/>
          <StartMenuItem>Shut down...</StartMenuItem>
        </Main>
      </Root>
    )
  }
}

export default StartMenu
