import styled from 'styled-components'

export default styled.div`
  width: 100%;
  max-height: 100%;
  flex: 1;
  display: flex;
  flex-direction: ${({desktop}) => desktop ? 'column' : 'row'};
  flex-wrap: wrap;
  align-content: flex-start;
  padding-top: 4px;
  overflow: ${({desktop}) => desktop ? 'hidden' : 'auto'};
  
  > .ninefive-Icon {
    ${({ iconTextColor }) => iconTextColor && `
      color: ${iconTextColor}
    `};
  }
`
