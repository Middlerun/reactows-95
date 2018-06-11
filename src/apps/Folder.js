import React, { Component, Fragment } from 'react'

import Window from '../components/Window'
import WindowMenuItem from '../components/WindowMenuItem'
import RidgedBox from '../atoms/RidgedBox'
import IconArea from '../components/IconArea'
import LightlyInsetBox from '../atoms/LightlyInsetBox'
import WindowToolbar from '../components/WindowToolbar'

import { getIcon, ICON_FOLDER_OPEN } from '../icons'

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
  static getMenuItems() {
    return <Fragment>
      <WindowMenuItem label="File" underline={0}/>
      <WindowMenuItem label="Edit" underline={0}/>
      <WindowMenuItem label="View" underline={0}/>
      <WindowMenuItem label="Help" underline={0}/>
    </Fragment>
  }

  render() {
    const {
      children,
      ...props
    } = this.props

    const bottomAreaContent = <BottomContentArea>
      {children.length} object(s)
    </BottomContentArea>

    return (
      <Window
        {...props}
        bottomAreaContent={bottomAreaContent}
        icon={getIcon(ICON_FOLDER_OPEN, true)}
      >
        <WindowToolbar>
          {Folder.getMenuItems()}
        </WindowToolbar>
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
