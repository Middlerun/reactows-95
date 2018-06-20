import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

import LightlyInsetBox from '../atoms/LightlyInsetBox'
import RidgedButton from '../atoms/RidgedButton'

const WindowToolbar = styled.div`
  margin-bottom: 3px;
  padding-left: ${({noLeftPad}) => noLeftPad ? '0' : '6px'};
  
  ${({noWrap}) => noWrap && css`
    overflow: hidden;
    white-space: nowrap;
  `}
  
  > * {
    vertical-align: top;
  }
`

const Divider = LightlyInsetBox.extend`
  width: 100%;
  height: 2px;
  margin: 0;
  margin-bottom: 3px;
  border-width: 1px 0;
`.withComponent('hr')

const Spacer = styled.div`
  display: inline-block;
  width: 8px;
`

const ToolbarButton = RidgedButton.extend`
  width: 23px;
  height: 22px;
  display: inline-flex;
  padding: 0;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  ${({serif}) => serif && `font-family: 'Times New Roman', serif;`}
`

WindowToolbar.propTypes = {
  noWrap: PropTypes.bool,
  noLeftPad: PropTypes.bool,
}

ToolbarButton.propTypes = {
  serif: PropTypes.bool,
}

export default WindowToolbar
export { ToolbarButton, Spacer, Divider }
