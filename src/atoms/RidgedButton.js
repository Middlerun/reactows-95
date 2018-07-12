import GreyBox from './GreyBox'
import PropTypes from 'prop-types'
import { css } from 'styled-components'

import borderImage from '../img/border-button.png'
import borderImageStrong from '../img/border-strong.png'
import borderImageInset from '../img/border-button-inset.png'
import pressedBackground from '../img/scrollbar-track.png'

const RidgedButton = GreyBox.extend`
  display: inline-flex;
  align-items: center;
  color: black;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-family: "Microsoft Sans Serif", Arial, sans-serif;
  font-size: 12px;
  line-height: inherit;
  
  ${({standardFormat}) => standardFormat && css`
    width: 75px;
    height: 23px;
    justify-content: center;
  `}
  
  ${({ bold }) => bold && css`font-weight: bold;`}
  ${({ italic }) => italic && css`font-style: italic;`}
  ${({ underline }) => underline && css`text-decoration: underline;`}
  
  border-width: ${({inset, strongBorder}) => !inset && strongBorder ? '3px' : '2px'};
  border-style: solid;
  border-image:
    url('${({inset, strongBorder}) => inset ? borderImageInset : (strongBorder ? borderImageStrong : borderImage)}')
    ${({inset, strongBorder}) => !inset && strongBorder ? 3 : 2};
  
  img {
    pointer-events: none;
  }
  
  :disabled {
    color: #808080;
    text-shadow: white 1px 1px;
    
    img {
      filter: brightness(0%) invert(100%) brightness(50%) drop-shadow(1px 1px 0 white);
    }
  }
  
  > * {
    transform: translate(-1px, 0);
  }
  
  :focus {
    outline: 1px dotted black;
    outline-offset: -${({strongBorder}) => strongBorder ? 5 : 4}px;
  }
  
  ${({pressed}) => pressed && css`
    border-image: url('${borderImageInset}') 2;
    > * {
      transform: translate(0, 1px);
    }
    background-image: url('${pressedBackground}');
  `}
  
  :active:enabled {
    border-image: url('${borderImageInset}') 2;
    > * {
      transform: translate(0, 1px);
    }
  }
  
  ::-moz-focus-inner {
    border: 0;
  }
`.withComponent('button')

RidgedButton.propTypes = {
  standardFormat: PropTypes.bool,
  bold: PropTypes.bool,
  italic: PropTypes.bool,
  underline: PropTypes.bool,
  inset: PropTypes.bool,
  strongBorder: PropTypes.bool,
  pressed: PropTypes.bool,
}

export default RidgedButton
