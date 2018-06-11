import styled from 'styled-components'

import dropdownImage from '../img/dropdown.png'
import borderImageInset from '../img/border-inset.png'

export default styled.select`
  height: 21px;
  border-width: 2px;
  border-style: solid;
  border-image: url('${borderImageInset}') 2;
  appearance: none;
  background: white url('${dropdownImage}') no-repeat right;
  padding: 0 17px 0 1px;
  ${({width}) => width && `width: ${width};`};
  
  :focus {
    outline: 0;
  }
  
  option {
    background-color: white;
    color: black;
  
    :hover {
      background-color: #000080;
      color: white;
    }
  }
  
  :-moz-focusring {
    color: transparent;
    text-shadow: 0 0 0 #000;
  }
`
