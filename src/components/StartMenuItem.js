import React, { Component } from 'react'
import styled from 'styled-components'
import LightlyInsetBox from '../atoms/LightlyInsetBox'

import arrow from '../img/arrow-right.png'
import defaultIcon from '../img/icon-default.png'

const Root = styled.div`
  width: 100%;
  height: ${({mainStartMenu}) => mainStartMenu ? '36px' : '20px'};
  display: flex;
  align-items: center;
  white-space: nowrap;
  padding-right: 4px;
  
  ${({highlighted}) => highlighted && `
    background-color: #000080;
    color: white;
  `}
`

const IconContainer = styled.div`
  width: ${({mainStartMenu}) => mainStartMenu ? '32px' : '16px'};
  height: ${({mainStartMenu}) => mainStartMenu ? '32px' : '16px'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 3px;
  
`

const IconImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
`

const Label = styled.div`
  flex: 1;
  max-width: 250px;
  margin-left: 3px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const SubMenuArrow = styled.img`
  filter: ${({highlighted}) => highlighted ? 'invert(100%)' : 'none'};
  margin-left: ${({mainStartMenu}) => mainStartMenu ? '20px' : '8px'};
`

export const Divider = LightlyInsetBox.extend`
  height: 2px;
  margin: 3px;
  border-width: 1px 0;
`.withComponent('hr')

class StartMenuItem extends Component {
  render() {
    const {
      highlighted,
      mainStartMenu,
      renderSubMenuItems,
      icon,
      label,
      onMouseEnter,
      onClick,
    } = this.props

    return (
      <Root
        className="reactows95-StartMenuItem"
        highlighted={highlighted}
        mainStartMenu={mainStartMenu}
        onMouseEnter={onMouseEnter}
        onClick={onClick}
      >
        <IconContainer mainStartMenu={mainStartMenu}>
          <IconImage src={icon || defaultIcon}/>
        </IconContainer>
        <Label>{label}</Label>
        {renderSubMenuItems && <SubMenuArrow
          src={arrow}
          mainStartMenu={mainStartMenu}
          highlighted={highlighted}
        />}
      </Root>
    )
  }
}

export default StartMenuItem
