import React, { Component } from 'react'
import styled from 'styled-components'

import RidgedButton from '../atoms/RidgedButton'
import { getIcon } from '../icons'

const Root = RidgedButton.extend`
  justify-content: flex-start;
  padding: 1px 4px;
`

const IconImage = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 3px;
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
`

const Text = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

class TaskbarItem extends Component {
  render() {
    const {
      title,
      icon,
    } = this.props

    return (
      <Root className="TaskbarItem">
        {icon && <IconImage src={getIcon(icon, true)}/>}
        <Text>{title}</Text>
      </Root>
    )
  }
}

export default TaskbarItem
