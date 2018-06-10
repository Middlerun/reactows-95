import React, { Component } from 'react'

import Window from '../components/Window'
import RidgedBox from '../atoms/RidgedBox'
import IconArea from '../components/IconArea'
import LightlyInsetBox from '../atoms/LightlyInsetBox'

import { getIcon, ICON_FOLDER_OPEN } from '../icons'

const ContentRoot = RidgedBox.extend`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
`

const BottomContentArea = LightlyInsetBox.extend`
  height: 100%;
  padding: 0 3px;
`

class Folder extends Component {
  render() {
    const {
      children,
      ...props
    } = this.props

    const bottomAreaContent = <BottomContentArea>
      {children.length} object(s)
    </BottomContentArea>

    return (
      <Window {...props} bottomAreaContent={bottomAreaContent} icon={getIcon(ICON_FOLDER_OPEN, true)}>
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
