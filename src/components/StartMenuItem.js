import React, { Component } from 'react'
import styled from 'styled-components'
import LightlyInsetBox from '../atoms/LightlyInsetBox'

const Root = styled.div`
  width: 100%;
  height: 36px;
  display: flex;
  align-items: center;
  white-space: nowrap;
  padding-left: 40px;
  padding-right: 30px;
  
  :hover {
    background-color: #000080;
    color: white;
  }
`

export const Divider = LightlyInsetBox.extend`
  height: 2px;
  margin: 3px;
  border-width: 1px 0;
`.withComponent('hr')

class StartMenuItem extends Component {
  render() {
    const { children } = this.props

    return (
      <Root className="reactows95-StartMenuItem">
        {children}
      </Root>
    )
  }
}

export default StartMenuItem
