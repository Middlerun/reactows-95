import React, { Component } from 'react'
import styled from 'styled-components'

import RidgedButton from '../atoms/RidgedButton'

const Text = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

class TaskbarItem extends Component {
  render() {
    const { title } = this.props

    return (
      <RidgedButton className="TaskbarItem">
        <Text>{title}</Text>
      </RidgedButton>
    )
  }
}

export default TaskbarItem
