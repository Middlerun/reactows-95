import React, { Component } from 'react'
import styled from 'styled-components'

const Root = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #008080;
  display: flex;
  flex-direction: column;
  font-family: "Microsoft Sans Serif", Arial, sans-serif;
  font-size: 14px;
  
  * {
    box-sizing: border-box;
  }
`

class Desktop extends Component {
  render() {
    return (
      <Root className="ninefive-Desktop">
        {this.props.children}
      </Root>
    )
  }
}

export default Desktop
