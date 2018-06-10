import React, { Component } from 'react'

import LightlyInsetBox from '../atoms/LightlyInsetBox'

const Root = LightlyInsetBox.extend`
  display: flex;
  align-items: center;
  padding: 0 11px;
  user-select: none;
  white-space: nowrap;
`

class SystemTray extends Component {
  static getTime() {
    const date = new Date()
    let hours = date.getHours()
    const amPm = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12
    if (hours === 0) {
      hours = 12
    }
    const minutes = `${date.getMinutes()}`.padStart(2, '0')
    return `${hours}:${minutes} ${amPm}`
  }

  refresh = () => {
    this.forceUpdate()
  }

  componentDidMount() {
    this.scheduleUpdate()
  }

  scheduleUpdate() {
    const date = new Date()
    const timeToWait = (60 - date.getSeconds() + 1) * 1000
    this.updateTimeout = setTimeout(this.updateClock, timeToWait)
  }

  updateClock = () => {
    this.refresh()
    this.scheduleUpdate()
  }

  componentWillUnmount() {
    if (this.updateTimeout) {
      clearTimeout(this.updateTimeout)
      delete(this.updateTimeout)
    }
  }

  render() {
    return (
      <Root className="reactows95-SystemTray">
        {SystemTray.getTime()}
      </Root>
    )
  }
}

export default SystemTray
