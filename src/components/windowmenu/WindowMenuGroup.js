import React, { Component } from 'react'
import WindowToolbar from '../WindowToolbar'
import WindowMenuButton from './WindowMenuButton'

class WindowMenuGroup extends Component {
  render() {
    let { menus } = this.props
    menus = menus || []

    return (
      <WindowToolbar>
        {menus.map(({label, items, underline}) => <WindowMenuButton {...{label, items, underline}}/>)}
      </WindowToolbar>
    )
  }
}

export default WindowMenuGroup
