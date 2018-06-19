import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import styled from 'styled-components'
import { RootCloseWrapper } from 'react-overlays'

const Root = styled.div`
  position: absolute;
  ${({positioning}) => positioning.hasOwnProperty('top') && `top: ${positioning.top}px;`}
  ${({positioning}) => positioning.hasOwnProperty('bottom') && `bottom: ${positioning.bottom}px;`}
  ${({positioning}) => positioning.hasOwnProperty('left') && `left: ${positioning.left}px;`}
  ${({positioning}) => positioning.hasOwnProperty('right') && `right: ${positioning.right}px;`}
  z-index: 1;
`

class MenuOverlay extends Component {
  constructor() {
    super()
    this.state = { containerRect: null }
  }

  componentDidMount() {
    this.updateContainerRect()
  }

  componentDidUpdate() {
    this.updateContainerRect()
  }

  updateContainerRect() {
    const oldRect = this.state.containerRect
    const containerDomNode = findDOMNode(this.props.container)
    if (containerDomNode) {
      const containerRect = containerDomNode.getBoundingClientRect()
      if (!oldRect || containerRect.width !== oldRect.width || containerRect.height !== oldRect.height) {
        this.setState({ containerRect })
      }
    }
  }

  calculatePositioning(containerRect) {
    let { placement, placementOffset, alignEdge, alignOffset } = this.props
    const positioning = {}

    placementOffset = placementOffset || 0
    alignOffset = alignOffset || 0

    if (placement === 'top') {
      positioning.bottom = containerRect.height + placementOffset
    } else if (placement === 'bottom') {
      positioning.top = containerRect.height + placementOffset
    } else if (placement === 'right') {
      positioning.left = containerRect.width + placementOffset
    } else if (placement === 'left') {
      positioning.right = containerRect.width + placementOffset
    }

    if (alignEdge === 'top') {
      positioning.top = alignOffset
    } else if (alignEdge === 'bottom') {
      positioning.bottom = alignOffset
    } else if (alignEdge === 'right') {
      positioning.right = alignOffset
    } else if (alignEdge === 'left') {
      positioning.left = alignOffset
    }

    return positioning
  }

  render() {
    const {
      show,
      rootClose,
      rootCloseEvent,
      onHide,
      children,
    } = this.props

    const { containerRect } = this.state

    if (!show || !containerRect) {
      return null
    }

    let child = (
      <Root positioning={this.calculatePositioning(containerRect)}>
        {children}
      </Root>
    )

    if (rootClose) {
      child = (
        <RootCloseWrapper
          onRootClose={onHide}
          event={rootCloseEvent || 'mousedown'}
        >
          {child}
        </RootCloseWrapper>
      )
    }

    return child
  }
}

export default MenuOverlay
