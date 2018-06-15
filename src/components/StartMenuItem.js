import React, { Component } from 'react'
import styled from 'styled-components'
import LightlyInsetBox from '../atoms/LightlyInsetBox'

import arrow from '../img/arrow-right.png'

const Root = styled.div`
  width: 100%;
  height: ${({mainStartMenu}) => mainStartMenu ? '36px' : '20px'};
  display: flex;
  align-items: center;
  white-space: nowrap;
  padding-left: 40px;
  padding-right: 4px;
  
  ${({selected}) => selected && `
    background-color: #000080;
    color: white;
  `}
`

const Label = styled.div`
  flex: 1;
  max-width: 250px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const SubMenuArrow = styled.img`
  filter: ${({selected}) => selected ? 'invert(100%)' : 'none'};
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
      selected,
      mainStartMenu,
      renderSubMenuItems,
      label,
      onMouseEnter,
      onClick,
    } = this.props

    return (
      <Root
        className="reactows95-StartMenuItem"
        selected={selected}
        mainStartMenu={mainStartMenu}
        onMouseEnter={onMouseEnter}
        onClick={onClick}
      >
        <Label>{label}</Label>
        {renderSubMenuItems && <SubMenuArrow
          src={arrow}
          mainStartMenu={mainStartMenu}
          selected={selected}
        />}
      </Root>
    )
  }
}

export default StartMenuItem
