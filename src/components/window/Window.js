import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import RidgedBox from '../../atoms/RidgedBox'
import RidgedButton from '../../atoms/RidgedButton'
import WindowTitleBarTransition from './WindowTitleBarTransition'
import { TitleBar, TitleWrapper, IconImage } from './WindowTitleBar'

import minimizeIcon from '../../img/minimize.png'
import maximizeIcon from '../../img/maximize.png'
import unmaximizeIcon from '../../img/unmaximize.png'
import closeIcon from '../../img/close.png'
import resizeHandleImage from '../../img/resize-handle.png'
import resizeSW from '../../img/resize-se.png'

const LEFT_MOUSE_BUTTON = 0
const DEFAULT_MIN_WIDTH = 200
const DEFAULT_MIN_HEIGHT = 200

const Root = RidgedBox.extend`
  display: ${({minimized}) => minimized ? 'none' : 'flex'};
  flex-direction: column;
  position: absolute;
  padding: 2px;
  pointer-events: all;
  ${({maximized}) => maximized && css`
    border: 0;
  `}
  ${({zIndex}) => (typeof zIndex !== 'undefined') && css`
    z-index: ${zIndex};
  `}
`

const WindowContent = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 0;
`

const WindowButton = RidgedButton.extend`
  padding: 0 1px 1px 2px;
  margin-left: ${({leftMargin}) => leftMargin ? '2px' : '0'};
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
`

const BottomArea = styled.div`
  position: relative;
  height: 17px;
  margin-top: 2px;
  user-select: none;
`

const ResizeHandle = styled.img`
  position: absolute;
  bottom: -4px;
  right: -4px;
  cursor: url('${resizeSW}') 7 7, se-resize;
`

const maximizedGeometry = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
}

class Window extends Component {
  constructor(props) {
    super(props)

    const initialGeometry = props.initialGeometry || {}

    this.state = {
      dragging: false,
      resizing: false,
      dragStart: {},
      geometry: {
        left: initialGeometry.left || 100,
        top: initialGeometry.top || 100,
        width: initialGeometry.width || 420,
        height: initialGeometry.height || 400,
      },
      transitionType: null,
    }
  }

  setTitle() {
    const { fileName, onSetTitle } = this.props
    fileName && onSetTitle && onSetTitle(fileName)
  }

  componentDidMount() {
    this.setTitle()
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.minimized && prevProps.maximized && this.props.minimized) {
      this.setState({ transitionType: 'FromMaximizedToMinimized' })
    }
    else if (prevProps.minimized && !this.props.minimized && this.props.maximized) {
      this.setState({ transitionType: 'FromMinimizedToMaximized' })
    }
    else if (!prevProps.minimized && this.props.minimized) {
      this.setState({ transitionType: 'FromNormalToMinimized' })
    }
    else if (prevProps.minimized && !this.props.minimized) {
      this.setState({ transitionType: 'FromMinimizedToNormal' })
    }
    else if (!prevProps.maximized && this.props.maximized) {
      this.setState({ transitionType: 'FromNormalToMaximized' })
    }
    else if (prevProps.maximized && !this.props.maximized) {
      this.setState({ transitionType: 'FromMaximizedToNormal' })
    }

    if (this.props.fileName !== prevProps.fileName) {
      this.setTitle()
    }
  }

  dragStart = (e) => {
    const clickedWindowButton = !!e.target.dataset.button
    if (this.state.dragging || this.props.maximized || e.button !== LEFT_MOUSE_BUTTON || clickedWindowButton) {
      return
    }

    const mouseCoords = { x: e.screenX, y: e.screenY }
    this.setState(state => ({
      dragging: true,
      dragStart: {
        mouseCoords,
        geometry: state.geometry,
      }
    }))

    addEventListener('mousemove', this.onDragMove)
    addEventListener('mouseup', this.onDragEnd)
  }

  onDragMove = (e) => {
    const newX = e.screenX
    const newY = e.screenY
    this.setState(state => ({
      geometry: {
        ...state.geometry,
        left: state.dragStart.geometry.left + (newX - state.dragStart.mouseCoords.x),
        top:  state.dragStart.geometry.top  + (newY - state.dragStart.mouseCoords.y),
      },
    }))
  }

  onDragEnd = () => {
    this.setState({ dragging: false })

    removeEventListener('mousemove', this.onDragMove)
    removeEventListener('mouseup', this.onDragEnd)
  }

  resizeStart = (e) => {
    if (this.state.resizing || this.props.maximized || e.button !== LEFT_MOUSE_BUTTON) {
      return
    }
    e.preventDefault()

    const mouseCoords = { x: e.screenX, y: e.screenY }
    this.setState(state => ({
      resizing: true,
      dragStart: {
        mouseCoords,
        geometry: state.geometry,
      }
    }))

    addEventListener('mousemove', this.onResizeMove)
    addEventListener('mouseup', this.onResizeEnd)
  }

  onResizeMove = (e) => {
    const { minWidth, minHeight } = this.props
    const newX = e.screenX
    const newY = e.screenY
    this.setState(state => {
      const draggedWidth  = state.dragStart.geometry.width  + (newX - state.dragStart.mouseCoords.x)
      const draggedHeight = state.dragStart.geometry.height + (newY - state.dragStart.mouseCoords.y)
      return {
        geometry: {
          ...state.geometry,
          width: Math.max((minWidth || DEFAULT_MIN_WIDTH), draggedWidth),
          height: Math.max((minHeight || DEFAULT_MIN_HEIGHT), draggedHeight),
        },
      }
    })
  }

  onResizeEnd = () => {
    this.setState({ resizing: false })

    removeEventListener('mousemove', this.onResizeMove)
    removeEventListener('mouseup', this.onResizeEnd)
  }

  toggleMaximized = (e) => {
    e.target.blur()
    const { maximized, setMaximized } = this.props
    setMaximized && setMaximized(!maximized)
  }

  toggleMinimized = (e) => {
    e.target.blur()
    const { minimized, setMinimized } = this.props
    setMinimized && setMinimized(!minimized)
  }

  clearTransition = () => {
    this.setState({ transitionType: null })
  }

  matchTransition(regex) {
    const { transitionType } = this.state
    return transitionType && transitionType.match(regex)
  }

  render() {
    const {
      fileName,
      title,
      icon,
      hasFocus,
      onRequestClose,
      bottomAreaContent,
      maximized,
      minimized,
      minimizable,
      resizable,
      taskbarItemId,
      children,
      ...otherProps
    } = this.props

    const {
      geometry,
      transitionType,
    } = this.state

    const displayAsMaximized = (maximized && !this.matchTransition(/ToMaximized/))
      || this.matchTransition(/FromMaximized/)
    const displayAsMinimized = (minimized && !this.matchTransition(/ToMinimized/))
      || this.matchTransition(/FromMinimized/)

    return <Fragment>
      <Root
        style={displayAsMaximized ? maximizedGeometry : geometry}
        maximized={displayAsMaximized}
        minimized={displayAsMinimized}
        {...otherProps}
      >
        <TitleBar hasFocus={hasFocus} onMouseDown={this.dragStart}>
          {icon && <IconImage src={icon} draggable={false}/>}

          <TitleWrapper>{title || fileName}</TitleWrapper>

          {minimizable && <WindowButton
            onClick={this.toggleMinimized}
            data-button={true}
          >
            <img src={minimizeIcon}/>
          </WindowButton>}

          {resizable && <WindowButton
            onClick={this.toggleMaximized}
            data-button={true}
          >
            <img src={displayAsMaximized ? unmaximizeIcon : maximizeIcon}/>
          </WindowButton>}

          <WindowButton
            onClick={onRequestClose}
            data-button={true}
            leftMargin
            disabled={!onRequestClose}
          >
            <img src={closeIcon}/>
          </WindowButton>
        </TitleBar>

        <WindowContent>
          {children}
        </WindowContent>

        {(bottomAreaContent || resizable) && <BottomArea>
          {bottomAreaContent}
          {resizable && !displayAsMaximized && <ResizeHandle
            src={resizeHandleImage}
            draggable={false}
            onMouseDown={this.resizeStart}
          />}
        </BottomArea>}
      </Root>

      {transitionType && <WindowTitleBarTransition
        key={transitionType}
        windowGeometry={geometry}
        type={transitionType}
        icon={icon}
        title={title || fileName}
        taskbarItemId={taskbarItemId}
        onTransitionEnd={this.clearTransition}
      />}
    </Fragment>
  }
}

Window.propTypes = {
  initialGeometry: PropTypes.shape({
    left: PropTypes.number,
    top: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  maximized: PropTypes.bool,
  minimized: PropTypes.bool,
  minimizable: PropTypes.bool,
  resizable: PropTypes.bool,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  hasFocus: PropTypes.bool,
  zIndex: PropTypes.number,
  bottomAreaContent: PropTypes.node,
  setMaximized: PropTypes.func,
  setMinimized: PropTypes.func,
  minWidth: PropTypes.number,
  minHeight: PropTypes.number,
  onRequestClose: PropTypes.func,
  taskbarItemId: PropTypes.string,
}

Window.defaultProps = {
  minimizable: true,
  resizable: true,
}

export default Window
