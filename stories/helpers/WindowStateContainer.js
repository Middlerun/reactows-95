import React, { Component } from 'react'

import {
  Desktop,
  Shell,
  Taskbar,
  TaskbarItem,
  Window,
  WindowLayer,
} from '../../src'

class WindowStateContainer extends Component {
  constructor() {
    super()
    this.state = {
      minimized: false,
      maximized: false,
    }
  }

  setMinimized = (isMinimized) => {
    this.setState({ minimized: isMinimized })
  }

  setMaximized = (isMaximized) => {
    this.setState({ maximized: isMaximized })
  }

  render() {
    const { maximized, minimized } = this.state

    const onClick = () => this.setMinimized(!minimized)

    return (
      <Shell>
        <Desktop>
          <WindowLayer>
            <Window
              title="A window"
              minimized={minimized}
              maximized={maximized}
              setMinimized={this.setMinimized}
              setMaximized={this.setMaximized}
              taskbarItemId="story-taskbar-item"
              hasFocus
            />
          </WindowLayer>
        </Desktop>
        <Taskbar startMenuItems={[]}>
          <TaskbarItem label="A window" onClick={onClick} focused={!minimized} id="story-taskbar-item"/>
        </Taskbar>
      </Shell>
    )
  }
}

export default WindowStateContainer
