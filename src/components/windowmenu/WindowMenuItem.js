import React, { Component } from 'react'
import styled, { css } from 'styled-components'

import WindowMenu from './WindowMenu'
import LightlyInsetBox from '../../atoms/LightlyInsetBox'
import MenuOverlay from '../MenuOverlay'

import underlinedLabel from '../../util/underlinedLabel'

import arrow from '../../img/arrow-right.png'

const Root = styled.div`
  position: relative;
  width: 100%;
  height: 17px;
  display: flex;
  align-items: center;
  white-space: nowrap;
  padding-right: 4px;
  
  ${({highlighted}) => highlighted && css`
    background-color: #000080;
  `}
`

const Label = styled.div`
  flex: 1;
  max-width: 250px;
  margin-left: 23px;
  margin-right: 23px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  
  ${({ highlighted }) => highlighted && css`
    color: white;
  `}
`

const SubMenuArrow = styled.img`
  filter: ${({highlighted}) => highlighted ? 'invert(100%)' : 'none'};
  margin-left: 5px;
`

export const Divider = LightlyInsetBox.extend`
  height: 2px;
  margin: 3px 0;
  border-width: 1px 0;
`.withComponent('hr')

class WindowMenuItem extends Component {
  componentDidMount() {
    if (this.props.highlighted) {
      this.onGainHighlight()
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.highlighted && this.props.highlighted) {
      this.onGainHighlight()
    } else if (prevProps.highlighted && !this.props.highlighted) {
      this.onLoseHighlight()
    }
  }

  onGainHighlight() {
    const { onLinger } = this.props
    this.lingerTimeout = setTimeout(() => {
      onLinger && onLinger()
      delete this.lingerTimeout
    }, 500)
  }

  onLoseHighlight() {
    if (this.lingerTimeout) {
      clearTimeout(this.lingerTimeout)
      delete this.lingerTimeout
    }
  }

  onMouseEnter = (e) => {
    const { onMouseEnter } = this.props
    onMouseEnter && onMouseEnter(e)
  }

  onMouseLeave = (e) => {
    const { onMouseLeave } = this.props
    onMouseLeave && onMouseLeave(e)
  }

  onClick = (e) => {
    const { items, onClick, onLinger, onSelect } = this.props
    onClick && onClick(e)
    onLinger && onLinger(e)
    !items && onSelect && onSelect()
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
      items,
      subMenuOpen,
      label,
      underline,
      onItemSelected,
    } = this.props

    return (
      <Root
        highlighted={highlighted}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onClick={this.onClick}
        ref={el => {
          if (el) {
            this.root = el
          }
        }}
      >
        <Label highlighted={highlighted}>
          {underlinedLabel(label, underline)}
          </Label>

        {items && <SubMenuArrow
          src={arrow}
          highlighted={highlighted}
        />}

        {items && <MenuOverlay
          show={subMenuOpen}
          placement="right"
          placementOffset={-2}
          alignEdge="top"
          alignOffset={-3}
          container={this}
        >
          <WindowMenu
            items={items}
            isSubMenu={true}
            onItemSelected={onItemSelected}
          />
        </MenuOverlay>}
      </Root>
    )
  }
}

export default WindowMenuItem
