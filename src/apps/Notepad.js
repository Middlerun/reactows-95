import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import styled, { css } from 'styled-components'

import Window from '../components/window/Window'
import WindowMenuGroup from '../components/windowmenu/WindowMenuGroup'
import RidgedBox from '../atoms/RidgedBox'
import textCursor from '../img/text-cursor.png'
import resizeHandleImage from '../img/resize-handle.png'

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

const ResizeHandleContainer = styled.div`
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: ${({size}) => size}px;
  height: ${({size}) => size}px;
  background-color: #c0c0c0;
  ${({showHandle}) => showHandle && css`
    background: #c0c0c0 url(${resizeHandleImage}) no-repeat;
    background-position: ${({size}) => size - 12}px ${({size}) => size - 12}px;
  `}
`

class Notepad extends Component {
  constructor() {
    super()
    this.state = {
      wordWrap: true,
      scrollbarSize: null,
    }
  }

  setTitle() {
    const { onSetTitle } = this.props
    onSetTitle && onSetTitle(this.generateTitle())
  }

  componentDidMount() {
    this.setTitle()
    this.updateScrollbarSizeIfNeeded()
  }

  componentDidUpdate(prevProps) {
    if (this.props.fileName !== prevProps.fileName) {
      this.setTitle()
    }
    this.updateScrollbarSizeIfNeeded()
  }

  updateScrollbarSizeIfNeeded() {
    if (!this.contentDiv || !this.contentPre) {
      return
    }
    const scrollbarSize = findDOMNode(this.contentDiv).getBoundingClientRect().width -
      findDOMNode(this.contentPre).getBoundingClientRect().width - 4
    this.setState(state => (
      state.scrollbarSize !== scrollbarSize ? { scrollbarSize } : null
    ))
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

    const {
      maximized,
      resizable,
    } = this.props

    const { wordWrap, scrollbarSize } = this.state

    const windowInitialGeometry = {
      width: 600,
      height: 500,
      ...initialGeometry
    }

    console.log(resizable, maximized, this.props)

    // TODO: Remove bottom content area while keeping window resizable
    return (
      <Window
        {...props}
        title={title || this.generateTitle()}
        initialGeometry={windowInitialGeometry}
        showResizeHandle={!wordWrap}
      >
        <WindowMenuGroup menus={this.getMenus()}/>

        <ContentRoot inset>
          <Content wordWrap={wordWrap} ref={el => this.contentDiv = el}>
            <pre ref={el => this.contentPre = el}>
              {children}
            </pre>
          </Content>

          {!wordWrap && <ResizeHandleContainer
            size={scrollbarSize}
            showHandle={resizable && !maximized}
          />}
        </ContentRoot>
      </Window>
    )
  }
}

Notepad.defaultProps = {
  resizable: true,
}

export default Notepad
