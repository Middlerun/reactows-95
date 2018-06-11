import styled from 'styled-components'

import LightlyInsetBox from '../atoms/LightlyInsetBox'
import RidgedButton from '../atoms/RidgedButton'

export default styled.div`
  margin-bottom: 3px;
  padding-left: 4px;
  
  ${({noWrap}) => noWrap && `
    overflow: hidden;
    white-space: nowrap;
  `}
  
  > * {
    vertical-align: top;
  }
`

export const ToolbarDivider = LightlyInsetBox.extend`
  width: 100%;
  height: 2px;
  margin: 0;
  margin-bottom: 3px;
  border-width: 1px 0;
`.withComponent('hr')

export const ToolbarSpacer = styled.div`
  display: inline-block;
  width: 8px;
`

export const ToolbarButton = RidgedButton.extend`
  width: 23px;
  height: 22px;
  display: inline-flex;
  padding: 0;
  justify-content: center;
  align-items: center;
  ${({serif}) => serif && `font-family: 'Times New Roman', serif;`}
`
