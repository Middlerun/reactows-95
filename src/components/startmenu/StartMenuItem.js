import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import StartMenu from './StartMenu'
import LightlyInsetBox from '../../atoms/LightlyInsetBox'

import arrow from '../../img/arrow-right.png'
import defaultIcon from '../../img/icon-default.png'

const Root = styled.div`
  position: relative;
  width: 100%;
  height: ${({mainStartMenu}) => mainStartMenu ? '32px' : '20px'};
  display: flex;
  align-items: center;
  white-space: nowrap;
  padding-right: 4px;
  
  ${({highlighted}) => highlighted && `
    background-color: #000080;
  `}
`

const IconContainer = styled.div`
  width: ${({mainStartMenu}) => mainStartMenu ? '24px' : '16px'};
  height: ${({mainStartMenu}) => mainStartMenu ? '24px' : '16px'};
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
  margin-right: 3px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  
  ${({ highlighted }) => highlighted && css`
    color: white;
  `}
  
  ${({ disabled }) => disabled && css`
    color: #808080;
  `}
  
  ${({ disabled, highlighted }) => disabled && !highlighted && css`
    text-shadow: white 1px 1px;
  `}
`

const SubMenuArrow = styled.img`
  filter: ${({highlighted}) => highlighted ? 'invert(100%)' : 'none'};
  margin-left: ${({mainStartMenu}) => mainStartMenu ? '26px' : '5px'};
`

export const Divider = LightlyInsetBox.extend`
  height: 2px;
  margin: 3px;
  border-width: 1px 0;
`.withComponent('hr')

class StartMenuItem extends Component {
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

  onClick = (e) => {
    const { subMenuItems, onLinger, onSelect } = this.props
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
      defaultDirectionIsLeft,
      icon,
      noIcon,
      label,
      disabled,
      onItemSelected,
    } = this.props

    return (
      <Root
        className="reactows95-StartMenuItem"
        highlighted={highlighted}
        mainStartMenu={mainStartMenu}
        onMouseEnter={this.onMouseEnter}
        onClick={this.onClick}
        ref={el => {
          if (el) {
            this.root = el
          }
        }}
      >
        <IconContainer mainStartMenu={mainStartMenu}>
          {noIcon || <IconImage src={icon || defaultIcon} draggable={false}/>}
        </IconContainer>

        <Label {...{highlighted, disabled}}>{label}</Label>

        {subMenuItems && <SubMenuArrow
          src={arrow}
          mainStartMenu={mainStartMenu}
          highlighted={highlighted}
        />}

        {subMenuItems &&
          <StartMenu
            items={subMenuItems}
            isOpen={subMenuOpen}
            isSubMenu={true}
            onItemSelected={onItemSelected}
            container={this}
            defaultDirectionIsLeft={defaultDirectionIsLeft}
          />
        }
      </Root>
    )
  }
}

StartMenuItem.propTypes = {
  highlighted: PropTypes.bool,
  mainStartMenu: PropTypes.bool,
  subMenuItems: PropTypes.array,
  subMenuOpen: PropTypes.bool,
  defaultDirectionIsLeft: PropTypes.bool,
  icon: PropTypes.string,
  label: PropTypes.string.isRequired,
  onItemSelected: PropTypes.func,
  onLinger: PropTypes.func,
  onSelect: PropTypes.func,
}

export default StartMenuItem
