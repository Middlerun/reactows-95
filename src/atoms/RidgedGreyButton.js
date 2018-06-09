import RidgedGreyBox, { borderImageInset } from './RidgedGreyBox'

export default RidgedGreyBox.extend`
  display: flex;
  align-items: center;
  color: black;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  
  > * {
    transform: translate(-1px, -1px);
  }
  
  &:focus {
    outline: 1px dotted black;
    outline-offset: -4px;
  }
  
  &:active {
    border-image: url('${borderImageInset}') 2;
    
    > * {
      transform: translate(0, 0);
    }
  }
`.withComponent('button')
