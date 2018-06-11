import React, { Component, Fragment } from 'react'
import styled from 'styled-components'

import Window from '../components/Window'
import WindowMenuItem from '../components/WindowMenuItem'
import RidgedBox from '../atoms/RidgedBox'
import LightlyInsetBox from '../atoms/LightlyInsetBox'
import WindowToolbar, { ToolbarDivider, ToolbarSpacer } from '../components/WindowToolbar'
import Select from '../atoms/Select'

import { getIcon, ICON_RICH_TEXT } from '../icons'

const ContentRoot = RidgedBox.extend`
  flex: 1;
  display: flex;
  width: 100%;
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

const fontCssMap = {
  'Arial': 'Arial, sans-serif',
  'Times New Roman': "'Times New Roman', serif",
}
const fonts = Object.keys(fontCssMap)
const sizes = [8, 10, 12, 14, 16, 18, 20]

class WordPad extends Component {
  constructor() {
    super()
    this.state = {
      font: 'Arial',
      fontSize: 12,
      bold: false,
      italic: false,
      underline: false,
    }
  }

  getContentStyle() {
    const {
      font,
      fontSize,
    } = this.state

    const style = {
      fontFamily: fontCssMap[font],
      fontSize,
    }

    return style
  }

  onFontChange = (e) => {
    this.setState({ font: e.target.value })
  }

  onFontSizeChange = (e) => {
    this.setState({ fontSize: parseInt(e.target.value) })
  }

  static getMenuItems() {
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

    const {
      font,
      fontSize,
    } = this.state

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
        bottomAreaContent={bottomAreaContent}
        icon={getIcon(ICON_RICH_TEXT, true)}>
        <WindowToolbar>
          {WordPad.getMenuItems()}
        </WindowToolbar>

        <ToolbarDivider/>

        <WindowToolbar noWrap>
          <Select width="240px" onChange={this.onFontChange} value={font}>
            {fonts.map(fontOption => (
              <option value={fontOption}>{fontOption}</option>
            ))}
          </Select>
          <ToolbarSpacer/>
          <Select width="50px" onChange={this.onFontSizeChange} value={fontSize}>
            {sizes.map(sizeOption => (
              <option value={sizeOption}>{sizeOption}</option>
            ))}
          </Select>
        </WindowToolbar>

        <ContentRoot inset>
          <Content style={this.getContentStyle()}>
            {children}
          </Content>
        </ContentRoot>
      </Window>
    )
  }
}

export default WordPad
