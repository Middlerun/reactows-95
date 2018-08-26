import React, { Component } from 'react'
import styled from 'styled-components'

import Window from '../components/window/Window'
import WindowMenuGroup from '../components/windowmenu/WindowMenuGroup'
import RidgedBox from '../atoms/RidgedBox'
import LightlyInsetBox from '../atoms/LightlyInsetBox'
import LightBorderBox from '../atoms/LightBorderBox'
import WindowToolbar, { Divider, Spacer, ToolbarButton } from '../components/WindowToolbar'
import Select from '../atoms/Select'
import textCursor from '../img/text-cursor.png'
import rulerBg from '../img/ruler.png'
import rulerMarker1 from '../img/ruler-marker-1.png'
import rulerMarker2 from '../img/ruler-marker-2.png'
import rulerMarker3 from '../img/ruler-marker-3.png'
import justifyLeft from '../img/justify-left.png'
import justifyCenter from '../img/justify-center.png'

const ContentRoot = RidgedBox.extend`
  flex: 1;
  display: flex;
  width: 100%;
  background-color: white;
  overflow: auto;
`

const Content = styled.div`
  min-height: 100%;
  width: 598px;
  max-width: 100%;
  padding: 10px;
  overflow-wrap: break-word;
  cursor: url('${textCursor}') 3 9, auto;
  
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

const RulerMain = styled(RidgedBox)`
  display: inline-block;
  position: relative;
  width: 576px;
  height: 17px;
  margin-left: 6px;
  border-left: 1px solid black;
  border-right: 0;
  background-color: white;
  background-image: url('${rulerBg}');
  background-position: left center;
  background-repeat: repeat-x;
  padding-left: 47px;
  user-select: none;
  
  > div {
    display: inline-flex;
    width: 96px;
    height: 100%;
    justify-content: center;
    align-items: center;
    font-size: 11px;
  }
`

const RulerExtra = styled(LightBorderBox)`
  display: inline-block;
  width: 120px;
  height: 17px;
  border-right: 0;
  background-image: url('${rulerBg}');
  background-position: left center;
  background-repeat: repeat-x;
  padding-left: 47px;
  user-select: none;
  
  > div {
    display: inline-flex;
    width: 96px;
    height: 100%;
    justify-content: center;
    align-items: center;
    font-size: 11px;
  }
`

const RulerRightBorder = styled.div`
  display: inline-block;
  width: 1px;
  height: 17px;
  background-color: #808080;
  border-bottom: 1px solid white;
`

const RulerMarker = styled.img.attrs({
  draggable: false,
})`
  position: absolute;
`

const fontCssMap = {
  'Arial': 'Arial, sans-serif',
  'Courier New': "'Courier New', monospace",
  'Helvetica': 'Helvetica, sans-serif',
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
      textAlign: 'left',
    }
  }

  setTitle() {
    const { onSetTitle } = this.props
    onSetTitle && onSetTitle(this.generateTitle())
  }

  componentDidMount() {
    this.setTitle()
  }

  componentDidUpdate(prevProps) {
    if (this.props.fileName !== prevProps.fileName) {
      this.setTitle()
    }
  }

  generateTitle() {
    return (this.props.fileName || 'Untitled') + ' - WordPad'
  }

  getContentStyle() {
    const {
      font,
      fontSize,
      bold,
      italic,
      underline,
      textAlign,
    } = this.state

    const style = {
      fontFamily: fontCssMap[font],
      fontSize,
      textAlign,
    }
    if (bold) {
      style.fontWeight = 'bold'
    }
    if (italic) {
      style.fontStyle = 'italic'
    }
    if (underline) {
      style.textDecoration = 'underline'
    }

    return style
  }

  onFontChange = (e) => {
    this.setState({ font: e.target.value })
  }

  onFontSizeChange = (e) => {
    this.setState({ fontSize: parseInt(e.target.value) })
  }

  setTextAlign(textAlign) {
    this.setState({ textAlign })
  }

  toggleState(stateProperty) {
    this.setState(state => ({
      [stateProperty]: !state[stateProperty],
    }))
  }

  getMenus() {
    const { onRequestClose } = this.props
    return [
      { label: 'File', underline: 0, items: [
          { label: 'New...', underline: 0, disabled: true },
          { label: 'Open...', underline: 0, disabled: true },
          { label: 'Save', underline: 0, disabled: true },
          { label: 'Save As...', underline: 5, disabled: true },
          'divider',
          { label: 'Print...', underline: 0, disabled: true },
          { label: 'Print Preview', underline: 9, disabled: true },
          { label: 'Page Setup', underline: 9, disabled: true },
          'divider',
          { label: 'Recent File', disabled: true },
          'divider',
          { label: 'Exit', underline: 1, onSelect: onRequestClose },
        ] },
      { label: 'Edit', underline: 0, items: [
          { label: 'Undo', underline: 0, disabled: true },
          'divider',
          { label: 'Cut', underline: 2, disabled: true },
          { label: 'Copy', underline: 0, disabled: true },
          { label: 'Paste', underline: 0, disabled: true },
          { label: 'Paste Special...', underline: 6, disabled: true },
          { label: 'Clear', underline: 3, disabled: true },
          { label: 'Select All', underline: 8, disabled: true },
          'divider',
          { label: 'Find...', underline: 0, disabled: true },
          { label: 'Find Next', underline: 5, disabled: true },
          { label: 'Replace...', underline: 1, disabled: true },
          'divider',
          { label: 'Links...', underline: 3, disabled: true },
          { label: 'Object Properties', underline: 8, disabled: true },
          { label: 'Object', underline: 0, disabled: true },
        ] },
      { label: 'View', underline: 0, items: [
          { label: 'Toolbar', underline: 0, disabled: true },
          { label: 'Format Bar', underline: 0, disabled: true },
          { label: 'Ruler', underline: 0, disabled: true },
          { label: 'Status Bar', underline: 0, disabled: true },
          'divider',
          { label: 'Options...', underline: 0, disabled: true },
        ] },
      { label: 'Insert', underline: 0, items: [
          { label: 'Date and Time...', underline: 0, disabled: true },
          { label: 'Object...', underline: 0, disabled: true },
        ] },
      { label: 'Format', underline: 1, items: [
          { label: 'Font...', underline: 0, disabled: true },
          { label: 'Bullet Style', underline: 0, disabled: true },
          { label: 'Paragraph...', underline: 0, disabled: true },
          { label: 'Tabs...', underline: 0, disabled: true },
        ] },
      { label: 'Help', underline: 0, items: [
          { label: 'Help Topics', underline: 0, disabled: true },
          { label: 'About WordPad', underline: 0, disabled: true },
        ] },
    ]
  }

  render() {
    const {
      children,
      title,
      fileName,
      onSetTitle,
      initialGeometry,
      ...props
    } = this.props

    const {
      font,
      fontSize,
      bold,
      italic,
      underline,
      textAlign,
    } = this.state

    const bottomAreaContent = <BottomContentArea>
      <LightlyInsetBox style={{width: 25}}/>
      <LightlyInsetBox style={{width: 29}}/>
    </BottomContentArea>

    const windowInitialGeometry = {
      width: 600,
      height: 500,
      ...initialGeometry
    }

    return (
      <Window
        {...props}
        title={title || this.generateTitle()}
        initialGeometry={windowInitialGeometry}
        bottomAreaContent={bottomAreaContent}
      >
        <WindowMenuGroup menus={this.getMenus()}/>

        <Divider/>

        <WindowToolbar noWrap>
          <Select width="240px" onChange={this.onFontChange} value={font}>
            {fonts.map((fontOption, i) => (
              <option value={fontOption} key={i}>{fontOption}</option>
            ))}
          </Select>
          <Spacer/>
          <Select width="50px" onChange={this.onFontSizeChange} value={fontSize}>
            {sizes.map((sizeOption, i) => (
              <option value={sizeOption} key={i}>{sizeOption}</option>
            ))}
          </Select>
          <Spacer/>
          <ToolbarButton onClick={() => {this.toggleState('bold')}} bold serif pressed={bold}>
            <span>B</span>
          </ToolbarButton>
          <ToolbarButton onClick={() => {this.toggleState('italic')}} italic serif pressed={italic}>
            <span>I</span>
          </ToolbarButton>
          <ToolbarButton onClick={() => {this.toggleState('underline')}} underline serif pressed={underline}>
            <span>U</span>
          </ToolbarButton>
          <Spacer/>
          <ToolbarButton onClick={() => {this.setTextAlign('left')}} pressed={textAlign === 'left'}>
            <img src={justifyLeft} draggable="false"/>
          </ToolbarButton>
          <ToolbarButton onClick={() => {this.setTextAlign('center')}} pressed={textAlign === 'center'}>
            <img src={justifyCenter} draggable="false"/>
          </ToolbarButton>
          <ToolbarButton onClick={() => {this.setTextAlign('right')}} pressed={textAlign === 'right'}>
            <img src={justifyLeft} draggable="false" style={{transform: 'scaleX(-1)'}}/>
          </ToolbarButton>
        </WindowToolbar>

        <Divider/>

        <WindowToolbar noWrap verticalOverflowSpace={6}>
          <RulerMain inset>
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <RulerMarker src={rulerMarker1} style={{top: -3, left: -5}}/>
            <RulerMarker src={rulerMarker2} style={{bottom: -2, left: -5}}/>
            <RulerMarker src={rulerMarker3} style={{bottom: -8, left: -5}}/>
            <RulerMarker src={rulerMarker2} style={{bottom: -2, right: -6}}/>
          </RulerMain>
          <RulerRightBorder/>
          <RulerExtra>
            <div>7</div>
          </RulerExtra>
          <RulerRightBorder/>
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
