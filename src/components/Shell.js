import React, { Component } from 'react'
import styled from 'styled-components'

import borderImage from '../img/border.png'
import scrollbarTrack from '../img/scrollbar-track.png'
import scrollUp from '../img/scroll-up.png'
import scrollDown from '../img/scroll-down.png'
import scrollLeft from '../img/scroll-left.png'
import scrollRight from '../img/scroll-right.png'

const Root = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #008080;
  display: flex;
  flex-direction: column;
  font-family: "Microsoft Sans Serif", Arial, sans-serif;
  font-size: 12px;
  overflow: hidden;
  
  * {
    box-sizing: border-box;
  }
  
  *::-webkit-scrollbar {
    width: 16px;
  }

  *::-webkit-scrollbar-button:single-button {
    background-color: #c0c0c0;
    width: 16px;
    height: 16px;
    border-width: 2px;
    border-style: solid;
    border-image: url('${borderImage}') 2;
  }

  *::-webkit-scrollbar-button:single-button:vertical:decrement {
    background: #c0c0c0 url('${scrollUp}') center no-repeat;
  }

  *::-webkit-scrollbar-button:single-button:vertical:increment {
    background: #c0c0c0 url('${scrollDown}') center no-repeat;
  }

  *::-webkit-scrollbar-button:single-button:horizontal:decrement {
    background: #c0c0c0 url('${scrollLeft}') center no-repeat;
  }

  *::-webkit-scrollbar-button:single-button:horizontal:increment {
    background: #c0c0c0 url('${scrollRight}') center no-repeat;
  }

  *::-webkit-scrollbar-track {
    background: #f1f1f1;
    background-image: url('${scrollbarTrack}');
  }

  *::-webkit-scrollbar-thumb {
    background-color: #c0c0c0;
    width: 16px;
    border-width: 2px;
    border-style: solid;
    border-image: url('${borderImage}') 2;
  }
  
  button::-moz-focus-inner {
    border: 0;
  }
`

class Shell extends Component {
  render() {
    return (
      <Root className="reactows95-Shell">
        {this.props.children}
      </Root>
    )
  }
}

export default Shell
