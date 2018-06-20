import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import RidgedBox from '../../atoms/RidgedBox'
import StartMenuItem, { Divider } from './StartMenuItem'
import isObject from '../../util/isObject'

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
          key={i}
          itemKey={i}
          onMouseEnter={this.onMouseEnterItem(i)}
          onLinger={this.onLingerItem(i)}
          highlighted={i === highlightedItemKey}
          subMenuOpen={i === openedSubMenuItemKey}
          onSelect={() => {
            onItemSelected()
            onSelect && onSelect(item)
          }}
          onItemSelected={onItemSelected}
        />
      }
    })
  }

  render() {
    const { isSubMenu } = this.props
    return (
      <Root className="reactows95-StartMenu">
        {!isSubMenu && <LeftStripe>
          <OSNameText>
            <OSName1>Reactows</OSName1><OSName2>95</OSName2>
          </OSNameText>
        </LeftStripe>}
        <div>
          {this.generateMenuContent()}
        </div>
      </Root>
    )
  }
}

StartMenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ])),
  isSubMenu: PropTypes.bool,
  onItemSelected: PropTypes.func,
}

export default StartMenu
