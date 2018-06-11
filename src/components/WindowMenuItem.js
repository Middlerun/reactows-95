import React, { Component, Fragment } from 'react'
import styled from 'styled-components'

const Root = styled.div`
  display: inline-block;
  padding: 1px;
  margin-right: 8px;
  user-select: none;
  
  u {
    text-decoration: underline;
  }
`

class WindowMenuItem extends Component {
  static underlinedLabel(label, underline) {
    if (typeof underline === 'undefined') {
      return label
    }

    const piece1 = label.substr(0, underline)
    const piece2 = label.substr(underline, 1)
    const piece3 = label.substr(underline + 1)

    return <Fragment>{piece1}<u>{piece2}</u>{piece3}</Fragment>
  }

  render() {
    const { label, underline } = this.props

    return (
      <Root>
        {WindowMenuItem.underlinedLabel(label, underline)}
      </Root>
    )
  }
}

export default WindowMenuItem
