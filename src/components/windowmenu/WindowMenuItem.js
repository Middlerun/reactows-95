import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import WindowMenu from './WindowMenu'
import LightlyInsetBox from '../../atoms/LightlyInsetBox'
import MenuOverlay from '../MenuOverlay'

import underlinedLabel from '../../util/underlinedLabel'

import tick from '../../img/tick.png'
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

const Tick = styled.img`
  position: absolute;
  left: 6px;
  filter: ${({highlighted}) => highlighted ? 'invert(100%)' : 'none'};
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
  
  ${({ disabled }) => disabled && css`
    color: #808080;
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
    const { onMouseEnter, disabled } = this.props
    !disabled && onMouseEnter && onMouseEnter(e)
  }

  onClick = (e) => {
    const { items, onLinger, onSelect, disabled } = this.props
    if (disabled) {
      return
    }
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
      checked,
      items,
      subMenuOpen,
      label,
      underline,
      onItemSelected,
      disabled,
    } = this.props

    return (
      <Root
        highlighted={highlighted}
        onMouseEnter={this.onMouseEnter}
        onClick={this.onClick}
        ref={el => {
          if (el) {
            this.root = el
          }
        }}
      >
        {checked && <Tick src={tick} draggable="false" highlighted={highlighted}/>}

        <Label highlighted={highlighted} disabled={disabled}>
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

WindowMenuItem.propTypes = {
  highlighted: PropTypes.bool,
  checked: PropTypes.bool,
  items: PropTypes.array,
  subMenuOpen: PropTypes.bool,
  label: PropTypes.string.isRequired,
  underline: PropTypes.number,
  disabled: PropTypes.bool,
  onItemSelected: PropTypes.func,
  onLinger: PropTypes.func,
  onSelect: PropTypes.func,
  onMouseEnter: PropTypes.func,
}

export default WindowMenuItem
