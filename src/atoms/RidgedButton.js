import RidgedBox, { borderImageInset } from './RidgedBox'

export default RidgedBox.extend`
  display: flex;
  align-items: center;
  color: black;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-family: "Microsoft Sans Serif", Arial, sans-serif;
  font-size: 12px;
  line-height: inherit;
  
  :disabled {
    color: #808080;
    text-shadow: white 1px 1px;
  }
  
  > * {
    transform: translate(-1px, 0);
  }
  
  :focus {
    outline: 1px dotted black;
    outline-offset: -${({strongBorder}) => strongBorder ? 5 : 4}px;
  }
  
  :active:enabled {
    border-image: url('${borderImageInset}') 2;
    
    > * {
      transform: translate(0, 1px);
    }
  }
`.withComponent('button')
