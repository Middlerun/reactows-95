import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import styled from 'styled-components'
import { Overlay } from 'react-overlays'

import StartMenu from './StartMenu'
import LightlyInsetBox from '../atoms/LightlyInsetBox'

import arrow from '../img/arrow-right.png'
import defaultIcon from '../img/icon-default.png'

const Root = styled.div`
  position: relative;
  width: 100%;
  height: ${({mainStartMenu}) => mainStartMenu ? '36px' : '20px'};
  display: flex;
  align-items: center;
  white-space: nowrap;
  padding-right: 4px;
  
  ${({highlighted}) => highlighted && `
    background-color: #000080;
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
  
  ${({ highlighted }) => highlighted && `
    color: white;
  `}
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
  onMouseEnter = (e) => {
    const { onMouseEnter, onLinger } = this.props
    onMouseEnter && onMouseEnter(e)
    this.lingerTimeout = setTimeout(() => {
      onLinger && onLinger(e)
      delete this.lingerTimeout
    }, 500)
  }

  onMouseLeave = (e) => {
    const { onMouseLeave } = this.props
    onMouseLeave && onMouseLeave(e)
    if (this.lingerTimeout) {
      clearTimeout(this.lingerTimeout)
      delete this.lingerTimeout
    }
  }

  onClick = (e) => {
    const { subMenuItems, onClick, onLinger, onSelect } = this.props
    onClick && onClick(e)
    onLinger && onLinger(e)
    !subMenuItems && onSelect && onSelect()
  }

  componentWillUnmount() {
    if (this.lingerTimeout) {
      clearTimeout(this.lingerTimeout)
      delete this.lingerTimeout
    }
  }

  render() {
    const {
      highlighted,
      mainStartMenu,
      subMenuItems,
      subMenuOpen,
      icon,
      label,
      onItemSelected,
    } = this.props

    return (
      <Root
        className="reactows95-StartMenuItem"
        highlighted={highlighted}
        mainStartMenu={mainStartMenu}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onClick={this.onClick}
        ref={el => {
          if (el) {
            this.root = el
          }
        }}
      >
        <IconContainer mainStartMenu={mainStartMenu}>
          <IconImage src={icon || defaultIcon}/>
        </IconContainer>

        <Label highlighted={highlighted}>{label}</Label>

        {subMenuItems && <SubMenuArrow
          src={arrow}
          mainStartMenu={mainStartMenu}
          highlighted={highlighted}
        />}

        {subMenuItems && <Overlay
          show={subMenuOpen}
          placement="right"
          container={this}
          target={props => findDOMNode(this.root)}
          rootClose
          rootCloseEvent="mousedown"
        >
          <div style={{position: 'absolute'}}>
            <StartMenu
              items={subMenuItems}
              isSubMenu={true}
              onItemSelected={onItemSelected}
            />
          </div>
        </Overlay>}
      </Root>
    )
  }
}

export default StartMenuItem
