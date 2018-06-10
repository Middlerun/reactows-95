import React, { Component } from 'react'
import styled from 'styled-components'

import RidgedButton from '../atoms/RidgedButton'

const Root = RidgedButton.extend`
  padding: 1px 4px;
`

const Text = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

class TaskbarItem extends Component {
  render() {
    const { title } = this.props

    return (
      <Root className="TaskbarItem">
        <Text>{title}</Text>
      </Root>
    )
  }
}

export default TaskbarItem
