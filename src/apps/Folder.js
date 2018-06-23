import React, { Component, Fragment } from 'react'

import Window from '../components/Window'
import WindowMenuGroup from '../components/windowmenu/WindowMenuGroup'
import RidgedBox from '../atoms/RidgedBox'
import IconArea from '../components/IconArea'
import LightlyInsetBox from '../atoms/LightlyInsetBox'

const ContentRoot = RidgedBox.extend`
  flex: 1;
  display: flex;
  width: 100%;
  background-color: white;
  overflow: auto;
`

const BottomContentArea = LightlyInsetBox.extend`
  height: 100%;
  padding: 0 3px;
`

class Folder extends Component {
  getMenus() {
    const { onRequestClose } = this.props
    return [
      { label: 'File', underline: 0, items: [
          { label: 'New', underline: 2, disabled: true },
          'divider',
          { label: 'Create Shortcut', underline: 7, disabled: true },
          { label: 'Delete', underline: 0, disabled: true },
          { label: 'Rename', underline: 4, disabled: true },
          { label: 'Properties', underline: 1, disabled: true },
          'divider',
          { label: 'Close', underline: 0, onSelect: onRequestClose },
        ] },
      { label: 'Edit', underline: 0, items: [
          { label: 'Undo', underline: 0, disabled: true },
          'divider',
          { label: 'Cut', underline: 2, disabled: true },
          { label: 'Copy', underline: 0, disabled: true },
          { label: 'Paste', underline: 0, disabled: true },
          { label: 'Paste Shortcut', underline: 6, disabled: true },
          'divider',
          { label: 'Select All', underline: 7, disabled: true },
          { label: 'Invert Selection', underline: 0, disabled: true },
        ] },
      { label: 'View', underline: 0, items: [
          { label: 'Toolbar', underline: 0, disabled: true },
          { label: 'Status Bar', underline: 7, disabled: true },
          'divider',
          { label: 'Large Icons', underline: 3, disabled: true },
          { label: 'Small Icons', underline: 1, disabled: true },
          { label: 'List', underline: 0, disabled: true },
          { label: 'Details', underline: 0, disabled: true },
          'divider',
          { label: 'Arrange Icons', underline: 8, disabled: true },
          { label: 'Line up Icons', underline: 3, disabled: true },
          'divider',
          { label: 'Refresh', underline: 0, disabled: true },
          { label: 'Options...', underline: 0, disabled: true },
        ] },
      { label: 'Help', underline: 0, items: [
          { label: 'Help Topics', underline: 0, disabled: true },
          { label: 'About Reactows 95', underline: 0, disabled: true },
        ] },
    ]
  }

  render() {
    const {
      children,
      ...props
    } = this.props

    const bottomAreaContent = <BottomContentArea>
      {(children || []).length} object(s)
    </BottomContentArea>

    return (
      <Window
        {...props}
        bottomAreaContent={bottomAreaContent}
      >
        <WindowMenuGroup menus={this.getMenus()}/>
        <ContentRoot inset>
          <IconArea>
            {children}
          </IconArea>
        </ContentRoot>
      </Window>
    )
  }
}

export default Folder
