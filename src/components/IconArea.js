import styled from 'styled-components'
import PropTypes from 'prop-types'

const IconArea = styled.div`
  width: 100%;
  max-height: 100%;
  flex: 1;
  display: flex;
  flex-direction: ${({desktop}) => desktop ? 'column' : 'row'};
  flex-wrap: wrap;
  align-content: flex-start;
  padding-top: 4px;
  overflow: ${({desktop}) => desktop ? 'hidden' : 'auto'};
  
  > .reactows95-Icon {
    ${({ iconTextColor }) => iconTextColor && `
      color: ${iconTextColor}
    `};
  }
`

IconArea.propTypes = {
  desktop: PropTypes.bool,
  iconTextColor: PropTypes.string,
}

export default IconArea
