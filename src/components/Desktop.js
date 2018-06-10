import styled from 'styled-components'

export default styled.div`
  flex: 1;
  position: relative;
  z-index: 1;
  
  > * {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`
