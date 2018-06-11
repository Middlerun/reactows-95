import styled from 'styled-components'

import LightlyInsetBox from '../atoms/LightlyInsetBox'

export default styled.div`
  margin-bottom: 3px;
  padding-left: 4px;
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
