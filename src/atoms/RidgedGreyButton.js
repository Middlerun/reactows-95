import RidgedGreyBox, { borderImageInset } from './RidgedGreyBox'

export default RidgedGreyBox.extend`
  display: flex;
  align-items: center;
  color: black;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  
  :disabled {
    color: #808080;
    text-shadow: white 1px 1px;
  }
  
  > * {
    transform: translate(-1px, -1px);
  }
  
  :focus {
    outline: 1px dotted black;
    outline-offset: -${({strongBorder}) => strongBorder ? 5 : 4}px;
  }
  
  :active:enabled {
    border-image: url('${borderImageInset}') 2;
    
    > * {
      transform: translate(0, 0);
    }
  }
`.withComponent('button')
