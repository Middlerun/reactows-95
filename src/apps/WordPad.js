import React, { Component, Fragment } from 'react'
import styled from 'styled-components'

import Window from '../components/Window'
import WindowMenuItem from '../components/WindowMenuItem'
import RidgedBox from '../atoms/RidgedBox'
import LightlyInsetBox from '../atoms/LightlyInsetBox'

import { getIcon, ICON_RICH_TEXT } from '../icons'

const ContentRoot = RidgedBox.extend`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  overflow: auto;
`

const Content = styled.div`
  min-height: 100%;
  max-width: 600px;
  border-right: 1px solid lightgrey;
  padding: 10px;
  
  > :first-child {
    margin-top: 0;
  }
`

const BottomContentArea = styled.div`
  height: 100%;
  padding: 0 14px 0 3px;
  display: flex;
  justify-content: flex-end;
  
  > * + * {
    margin-left: 2px;
  }
`

class Folder extends Component {
  getMenuItems() {
    return <Fragment>
      <WindowMenuItem label="File" underline={0}/>
      <WindowMenuItem label="Edit" underline={0}/>
      <WindowMenuItem label="View" underline={0}/>
      <WindowMenuItem label="Insert" underline={0}/>
      <WindowMenuItem label="Format" underline={1}/>
      <WindowMenuItem label="Help" underline={0}/>
    </Fragment>
  }

  render() {
    const {
      children,
      title,
      initialGeometry,
      ...props
    } = this.props

    const bottomAreaContent = <BottomContentArea>
      <LightlyInsetBox style={{width: 25}}/>
      <LightlyInsetBox style={{width: 29}}/>
    </BottomContentArea>

    const windowTitle = (title || 'Untitled') + ' - WordPad'

    const windowInitialGeometry = {
      width: 600,
      height: 500,
      ...initialGeometry
    }

    return (
      <Window
        {...props}
        title={windowTitle}
        initialGeometry={windowInitialGeometry}
        menuItems={this.getMenuItems()}
        bottomAreaContent={bottomAreaContent}
        icon={getIcon(ICON_RICH_TEXT, true)}>
        <ContentRoot inset>
          <Content>
            {children}
          </Content>
        </ContentRoot>
      </Window>
    )
  }
}

export default Folder
