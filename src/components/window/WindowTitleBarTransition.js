import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { TitleBar, IconImage, TitleWrapper } from './WindowTitleBar'
import { getWidth, getHeight } from '../../util/getViewport'

const MAX_Z_INDEX = 2147483647

const Root = TitleBar.extend`
  position: absolute;
  z-index: ${MAX_Z_INDEX};
  pointer-events: none;
  transition: left .2s linear, top .2s linear, width .2s linear;
`

class WindowTitleBarTransition extends Component {
  constructor(props) {
    super(props)
    let geometry

    if (props.type.match(/FromMaximized/)) {
      geometry = this.maximizedGeometry()
    } else if (props.type.match(/FromMinimized/)) {
      geometry = this.minimizedGeometry(props)
    } else {
      geometry = this.regularGeometry(props)
    }

    this.state = {
      geometry,
    }

    this.transitionCompleted = false
  }

  componentDidMount() {
    setTimeout(() => {
      let geometry

      if (this.props.type.match(/ToMaximized/)) {
        geometry = this.maximizedGeometry()
      } else if (this.props.type.match(/ToMinimized/)) {
        geometry = this.minimizedGeometry(this.props)
      } else {
        geometry = this.regularGeometry(this.props)
      }

      this.setState({
        loaded: true,
        geometry,
      })

      // Fallback, in case the CSS `transitionend` event somehow doesn't fire
      setTimeout(this.onTransitionEnd, 250)
    }, 10)
  }

  maximizedGeometry() {
    return {
      top: 0,
      left: 0,
      width: getWidth(),
    }
  }

  minimizedGeometry(props) {
    const domNode = document.getElementById(props.taskbarItemId)
    if (domNode) {
      const rect = domNode.getBoundingClientRect()
      const gap = Math.floor((rect.height - 18) / 2)

      return {
        top: rect.top + gap,
        left: rect.left + gap,
        width: rect.width - gap * 2,
      }
    } else {
      const standardTaskbarItemWidth = 160
      return {
        top: getHeight() - 23,
        left: props.windowGeometry.left + props.windowGeometry.width / 2 - (standardTaskbarItemWidth / 2 - 2),
        width: standardTaskbarItemWidth - 4,
      }
    }
  }

  regularGeometry(props) {
    const { windowGeometry } = props
    return {
      top: windowGeometry.top + 4,
      left: windowGeometry.left + 4,
      width: windowGeometry.width - 8,
    }
  }

  onTransitionEnd = () => {
    const { onTransitionEnd } = this.props
    const { loaded } = this.state

    if (!this.transitionCompleted && loaded) {
      onTransitionEnd && onTransitionEnd()
      this.transitionCompleted = true
    }
  }

  render() {
    const { icon, title } = this.props
    const { geometry } = this.state

    return (
      <Root
        style={geometry}
        onTransitionEnd={this.onTransitionEnd}
        hasFocus
      >
        {icon && <IconImage src={icon}/>}
        <TitleWrapper>{title}</TitleWrapper>
      </Root>
    )
  }
}

WindowTitleBarTransition.propTypes = {
  windowGeometry: PropTypes.shape({
    left: PropTypes.number,
    top: PropTypes.number,
    width: PropTypes.number,
  }),
  onTransitionEnd: PropTypes.func.isRequired,
  taskbarItemId: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.oneOf([
    'FromNormalToMinimized',
    'FromMinimizedToNormal',
    'FromNormalToMaximized',
    'FromMaximizedToNormal',
    'FromMinimizedToMaximized',
    'FromMaximizedToMinimized',
  ]).isRequired,
}

export default WindowTitleBarTransition
