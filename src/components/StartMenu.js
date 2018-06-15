import React, { Component } from 'react'
import styled from 'styled-components'

import RidgedBox from '../atoms/RidgedBox'
import StartMenuItem, { Divider } from './StartMenuItem'
import isObject from '../util/isObject'

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

function generateMenuContent(menuItems, isMainStartMenu, menu, highlightedItemKey) {
  return menuItems.map((item, i) => {
    if (item === 'divider') {
      return <Divider key={i}/>
    } else if (!isObject(item)) {
      return null
    } else {
      const { label } = item
      return <StartMenuItem
        mainStartMenu={isMainStartMenu}
        label={label}
        key={i}
        itemKey={i}
        onMouseEnter={menu.onMouseEnterItem(i)}
        highlighted={i === highlightedItemKey}
      />
    }
  })
}

class StartMenu extends Component {
  constructor() {
    super()
    this.state = { highlightedItemKey: null }
  }

  onMouseEnterItem = (itemKey) => () => {
    this.setState({ highlightedItemKey: itemKey })
  }

  render() {
    const { items } = this.props
    const { highlightedItemKey } = this.state
    return (
      <Root className="reactows95-StartMenu">
        <LeftStripe>
          <OSNameText>
            <OSName1>Reactows</OSName1><OSName2>95</OSName2>
          </OSNameText>
        </LeftStripe>
        <div>
          {generateMenuContent(items, true, this, highlightedItemKey)}
        </div>
      </Root>
    )
  }
}

export default StartMenu
