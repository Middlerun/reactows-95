import React, { Component } from 'react'

import Window from '../Window'
import RidgedBox from '../atoms/RidgedBox'
import IconArea from '../IconArea'
import IconRegular from '../IconRegular'

const ContentRoot = RidgedBox.extend`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
`

class Folder extends Component {
  render() {
    const {
      children,
      ...props
    } = this.props

    return (
      <Window {...props}>
        <ContentRoot inset>
          <IconArea>
            {children}
          </IconArea>
        </ContentRoot>
      </Window>
    )
  }
}

export default Folder
