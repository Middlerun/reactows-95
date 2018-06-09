import React, { Component } from 'react'
import styled from 'styled-components'

import RidgedGreyButton from './atoms/RidgedGreyButton'

const Text = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

class TaskbarItem extends Component {
  render() {
    const { title } = this.props

    return (
      <RidgedGreyButton className="TaskbarItem">
        <Text>{title}</Text>
      </RidgedGreyButton>
    )
  }
}

export default TaskbarItem
