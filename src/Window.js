import React, { Component } from 'react'
import styled from 'styled-components'

import RidgedBox from './atoms/RidgedBox'
import RidgedButton from './atoms/RidgedButton'

import minimizeIcon from './img/minimize.png'
import maximizeIcon from './img/maximize.png'
import closeIcon from './img/close.png'

const LEFT_MOUSE_BUTTON = 0

const Root = RidgedBox.extend`
  display: flex;
  flex-direction: column;
  position: absolute;
  padding: 2px;
  pointer-events: all;
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
  position: relative;
`

const WindowButton = RidgedButton.extend`
  padding: 0 1px 1px 2px;
  margin-left: ${({leftMargin}) => leftMargin ? '2px' : '0'};
`

const BottomArea = styled.div`
  position: relative;
  height: 17px;
  margin-top: 2px;
`

class Window extends Component {
  constructor(props) {
    super(props)

    const initialGeometry = props.initialGeometry || {}

    this.state = {
      dragging: false,
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
    if (this.state.dragging || e.button !== LEFT_MOUSE_BUTTON) {
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

  render() {
    const {
      title,
      icon,
      hasFocus,
      onClose,
      bottomAreaContent,
      children,
    } = this.props
    const { geometry } = this.state

    return (
      <Root style={geometry}>
        <TitleBar hasFocus={hasFocus} onMouseDown={this.dragStart}>
          {icon && <IconImage src={icon}/>}

          <TitleWrapper>{title}</TitleWrapper>

          <WindowButton
            onMouseDown={e => {e.stopPropagation()}}
          >
            <img src={minimizeIcon}/>
          </WindowButton>

          <WindowButton
            onMouseDown={e => {e.stopPropagation()}}
          >
            <img src={maximizeIcon}/>
          </WindowButton>

          <WindowButton
            onClick={onClose}
            onMouseDown={e => {e.stopPropagation()}}
            leftMargin
          >
            <img src={closeIcon}/>
          </WindowButton>
        </TitleBar>

        <WindowContent>
          {children}
        </WindowContent>

        {bottomAreaContent && <BottomArea>
          {bottomAreaContent}
        </BottomArea>}
      </Root>
    )
  }
}

export default Window
