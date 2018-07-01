import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import RidgedBox from '../atoms/RidgedBox'
import RidgedButton from '../atoms/RidgedButton'

import minimizeIcon from '../img/minimize.png'
import maximizeIcon from '../img/maximize.png'
import unmaximizeIcon from '../img/unmaximize.png'
import closeIcon from '../img/close.png'
import resizeHandleImage from '../img/resize-handle.png'
import resizeSW from '../img/resize-se.png'

const LEFT_MOUSE_BUTTON = 0
const MIN_WIDTH = 200
const MIN_HEIGHT = 200

const Root = RidgedBox.extend`
  display: ${({minimized}) => minimized ? 'none' : 'flex'};
  flex-direction: column;
  position: absolute;
  padding: 2px;
  pointer-events: all;
  ${({maximized}) => maximized && 'border: 0;'}
  ${({zIndex}) => (typeof zIndex !== 'undefined') && `z-index: ${zIndex};`}
`

const TitleBar = styled.div`
  height: 18px;
  width: 100%;
  padding: 0 2px;
  display: flex;
  align-items: center;
  background-color: ${({hasFocus}) => hasFocus ? '#000082' : '#808080'};
  color: ${({hasFocus}) => hasFocus ? 'white' : '#c0c0c0'};
  font-weight: bold;
  margin-bottom: 2px;
  user-select: none;
`

const IconImage = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 2px;
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
`

const TitleWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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

const ButtonImage = styled.img`
  pointer-events: none;
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
    const newX = e.screenX
    const newY = e.screenY
    this.setState(state => ({
      geometry: {
        ...state.geometry,
        width:  Math.max(MIN_WIDTH,  state.dragStart.geometry.width  + (newX - state.dragStart.mouseCoords.x)),
        height: Math.max(MIN_HEIGHT, state.dragStart.geometry.height + (newY - state.dragStart.mouseCoords.y)),
      },
    }))
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

  render() {
    const {
      title,
      icon,
      hasFocus,
      onRequestClose,
      bottomAreaContent,
      maximized,
      minimized,
      resizable,
      children,
      ...otherProps
    } = this.props

    const { geometry } = this.state

    return (
      <Root
        style={maximized ? maximizedGeometry : geometry}
        maximized={maximized}
        minimized={minimized}
        {...otherProps}
      >
        <TitleBar hasFocus={hasFocus} onMouseDown={this.dragStart}>
          {icon && <IconImage src={icon} draggable={false}/>}

          <TitleWrapper>{title}</TitleWrapper>

          <WindowButton
            onClick={this.toggleMinimized}
            data-button={true}
          >
            <ButtonImage src={minimizeIcon}/>
          </WindowButton>

          {resizable && <WindowButton
            onClick={this.toggleMaximized}
            data-button={true}
          >
            <ButtonImage src={maximized ? unmaximizeIcon : maximizeIcon}/>
          </WindowButton>}

          <WindowButton
            onClick={onRequestClose}
            data-button={true}
            leftMargin
          >
            <ButtonImage src={closeIcon}/>
          </WindowButton>
        </TitleBar>

        <WindowContent>
          {children}
        </WindowContent>

        {(bottomAreaContent || resizable) && <BottomArea>
          {bottomAreaContent}
          {resizable && !maximized && <ResizeHandle
            src={resizeHandleImage}
            draggable={false}
            onMouseDown={this.resizeStart}
          />}
        </BottomArea>}
      </Root>
    )
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
  resizable: PropTypes.bool,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  hasFocus: PropTypes.bool,
  zIndex: PropTypes.number,
  bottomAreaContent: PropTypes.node,
  setMaximized: PropTypes.func,
  setMinimized: PropTypes.func,
  onRequestClose: PropTypes.func,
}

Window.defaultProps = {
  resizable: true,
}

export default Window
