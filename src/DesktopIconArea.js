import React, { Component } from 'react'
import styled from 'styled-components'

const Root = styled.div`
  width: 100%;
  flex: 1;
`

class DesktopIconArea extends Component {
  render() {
    return (
      <Root className="ninefive-DesktopIconArea">
        {this.props.children}
      </Root>
    )
  }
}

export default DesktopIconArea
