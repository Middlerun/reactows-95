import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import styled from 'styled-components'

import MenuOverlay from '../MenuOverlay'
import RidgedBox from '../../atoms/RidgedBox'
import StartMenuItem, { Divider } from './StartMenuItem'
import isObject from '../../util/isObject'
import { getWidth } from '../../util/getViewport'

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
  line-height: 22px;
`

const OSName1 = styled.span`
  color: #c0c0c0;
  font-weight: 900;
`

const OSName2 = styled.span`
  color: white;
`

class StartMenu extends Component {
  constructor() {
    super()
    this.state = {
      highlightedItemKey: null,
      openedSubMenuItemKey: null,
      directionReversed: false,
    }
    this.directionReversalChecked = false
  }

  static getDerivedStateFromProps(props) {
    if (!props.isOpen) {
      return {
        highlightedItemKey: null,
        openedSubMenuItemKey: null,
      }
    }
    return null
  }

  componentDidMount() {
    if (this.props.isOpen) {
      this.determineIfDirectionShouldReverse()
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.isOpen && !prevProps.isOpen
      && !this.directionReversalChecked) {
      this.determineIfDirectionShouldReverse()
    }
  }

  determineIfDirectionShouldReverse() {
    const { defaultDirectionIsLeft } = this.props
    if (this.root) {
      const domNode = findDOMNode(this.root)
      const rect = domNode.getBoundingClientRect()
      if ((defaultDirectionIsLeft && rect.left < 0)
        || (!defaultDirectionIsLeft && rect.right > getWidth())) {
        this.setState({ directionReversed: true })
      }
      this.directionReversalChecked = true
    }
  }

  onMouseEnterItem = (itemKey) => () => {
    this.setState({ highlightedItemKey: itemKey })
  }

  onLingerItem = (itemKey) => () => {
    this.setState({ openedSubMenuItemKey: itemKey })
  }

  generateMenuContent() {
    const { items, isSubMenu, onItemSelected } = this.props
    const { highlightedItemKey, openedSubMenuItemKey } = this.state

    if (!Array.isArray(items)) {
      return null
    }

    if (items.length === 0) {
      const i = 0
      return [
        <StartMenuItem
          mainStartMenu={!isSubMenu}
          label="(Empty)"
          key={i}
          itemKey={i}
          disabled
          noIcon
          onMouseEnter={this.onMouseEnterItem(i)}
          onLinger={this.onLingerItem(i)}
          highlighted={i === highlightedItemKey}
        />
      ]
    }

    return items.map((item, i) => {
      if (item === 'divider') {
        return <Divider key={i}/>
      } else if (!isObject(item)) {
        return null
      } else {
        const { icon, label, subMenuItems, onSelect } = item
        return <StartMenuItem
          mainStartMenu={!isSubMenu}
          icon={icon}
          label={label}
          subMenuItems={subMenuItems}
          defaultDirectionIsLeft={this.directionIsLeft()}
          key={i}
          itemKey={i}
          onMouseEnter={this.onMouseEnterItem(i)}
          onLinger={this.onLingerItem(i)}
          highlighted={i === highlightedItemKey}
          subMenuOpen={i === openedSubMenuItemKey}
          onSelect={() => {
            onItemSelected && onItemSelected()
            onSelect && onSelect(item)
          }}
          onItemSelected={onItemSelected}
        />
      }
    })
  }

  directionIsLeft() {
    const { defaultDirectionIsLeft } = this.props
    const { directionReversed } = this.state

    return !directionReversed !== !defaultDirectionIsLeft // Equivalent to XOR
  }

  render() {
    const {
      isOpen,
      isSubMenu,
      container,
    } = this.props

    const subMenuPlacement = this.directionIsLeft() ? 'left' : 'right'

    return (
      <MenuOverlay
        show={isOpen}
        placement={isSubMenu ? subMenuPlacement : 'top'}
        alignEdge={isSubMenu ? 'top' : 'left'}
        placementOffset={isSubMenu ? -2 : 0}
        alignOffset={isSubMenu ? -3 : 0}
        container={container}
      >
        <Root
          className="reactows95-StartMenu"
          ref={el => {
            if (el) {
              this.root = el
            }
          }}
        >
          {!isSubMenu && <LeftStripe>
            <OSNameText>
              <OSName1>Reactows</OSName1><OSName2>95</OSName2>
            </OSNameText>
          </LeftStripe>}
          <div>
            {this.generateMenuContent()}
          </div>
        </Root>
      </MenuOverlay>
    )
  }
}

StartMenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ])),
  isOpen: PropTypes.bool,
  isSubMenu: PropTypes.bool,
  onItemSelected: PropTypes.func,
  defaultDirectionIsLeft: PropTypes.bool,
  container: MenuOverlay.propTypes.container,
}

StartMenu.defaultProps = {
  isOpen: false,
  defaultDirectionIsLeft: false,
}

export default StartMenu
