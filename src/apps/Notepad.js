import React, { Component } from 'react'
import styled, { css } from 'styled-components'

import Window from '../components/window/Window'
import WindowMenuGroup from '../components/windowmenu/WindowMenuGroup'
import RidgedBox from '../atoms/RidgedBox'
import textCursor from '../img/text-cursor.png'

const ContentRoot = RidgedBox.extend`
  flex: 1;
  display: flex;
  width: 100%;
  background-color: white;
  overflow: auto;
`

const Content = styled.div`
  min-height: 100%;
  width: 100%;
  padding: 2px;
  cursor: url('${textCursor}') 3 9, auto;
  overflow-y: scroll;
  overflow-x:  ${({wordWrap}) => wordWrap ? 'hidden' : 'scroll'};
  
  > pre {
    margin: 0;
    font-family: Fixedsys, monospace;
    font-size: 12px;
    line-height: 15px;
    
    ${({wordWrap}) => wordWrap && css`
      max-width: 100%;
      white-space: pre-wrap;
    `}
  }
`

class WordPad extends Component {
  constructor() {
    super()
    this.state = { wordWrap: true }
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
    return (this.props.fileName || 'Untitled') + ' - Notepad'
  }

  toggleWordWrap = () => {
    this.setState(state => ({ wordWrap: !state.wordWrap }))
  }

  getMenus() {
    const { onRequestClose } = this.props
    const { wordWrap } = this.state

    return [
      { label: 'File', underline: 0, items: [
          { label: 'New...', underline: 0, disabled: true },
          { label: 'Open...', underline: 0, disabled: true },
          { label: 'Save', underline: 0, disabled: true },
          { label: 'Save As...', underline: 5, disabled: true },
          'divider',
          { label: 'Page Setup', underline: 6, disabled: true },
          { label: 'Print...', underline: 0, disabled: true },
          'divider',
          { label: 'Exit', underline: 1, onSelect: onRequestClose },
        ] },
      { label: 'Edit', underline: 0, items: [
          { label: 'Undo', underline: 0, disabled: true },
          'divider',
          { label: 'Cut', underline: 2, disabled: true },
          { label: 'Copy', underline: 0, disabled: true },
          { label: 'Paste', underline: 0, disabled: true },
          { label: 'Delete', underline: 2, disabled: true },
          'divider',
          { label: 'Select All', underline: 7, disabled: true },
          { label: 'Time/Date', underline: 5, disabled: true },
          'divider',
          { label: 'Word Wrap', underline: 0, checked: wordWrap, onSelect: this.toggleWordWrap },
        ] },
      { label: 'Search', underline: 0, items: [
          { label: 'Find...', underline: 0, disabled: true },
          { label: 'Find Next', underline: 5, disabled: true },
        ] },
      { label: 'Help', underline: 0, items: [
          { label: 'Help Topics', underline: 0, disabled: true },
          'divider',
          { label: 'About Notepad', underline: 0, disabled: true },
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

    const { wordWrap } = this.state

    const windowInitialGeometry = {
      width: 600,
      height: 500,
      ...initialGeometry
    }

    // TODO: Remove bottom content area while keeping window resizable
    return (
      <Window
        {...props}
        title={title || this.generateTitle()}
        initialGeometry={windowInitialGeometry}
      >
        <WindowMenuGroup menus={this.getMenus()}/>

        <ContentRoot inset>
          <Content wordWrap={wordWrap}>
            <pre>
              {children}
            </pre>
          </Content>
        </ContentRoot>
      </Window>
    )
  }
}

export default WordPad
