import React, { Component } from 'react'

import RidgedGreyBox, { borderImageInset } from './RidgedGreyBox'

export default RidgedGreyBox.extend`
  display: flex;
  align-items: center;
  
  > * {
    transform: translate(-1px, -1px);
  }
  
  &:focus {
    outline: none;
  }
  
  &:active {
    border-image: url('${borderImageInset}') 2;
    
    > * {
      transform: translate(0, 0);
    }
  }
`.withComponent('button')
