import React, { Component } from 'react'

import RidgedBox from '../../atoms/RidgedBox'
import WindowMenuItem, { Divider } from './WindowMenuItem'

import isObject from '../../util/isObject'

const Root = RidgedBox.extend`
  display: flex;
  padding: 1px;
  user-select: none;
`

class WindowMenu extends Component {
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
    const { items, onItemSelected } = this.props
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
        const { label, underline, items, onSelect } = item
        return <WindowMenuItem
          label={label}
          underline={underline}
          items={items}
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
    return (
      <Root className="reactows95-WindowMenu">
        <div>
          {this.generateMenuContent()}
        </div>
      </Root>
    )
  }
}

export default WindowMenu