import React, { Component } from 'react'
import styled from 'styled-components'

const Root = styled.div`
  width: 100%;
  flex: 1;
`

class IconArea extends Component {
  render() {
    return (
      <Root className="ninefive-IconArea">
        {this.props.children}
      </Root>
    )
  }
}

export default IconArea
