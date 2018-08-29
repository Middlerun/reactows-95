import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

import borderImage from '../img/border.png'
import borderImageInset from '../img/border-inset.png'
import scrollbarTrack from '../img/scrollbar-track.png'
import scrollUp from '../img/arrow-up.png'
import scrollDown from '../img/arrow-down.png'
import scrollLeft from '../img/arrow-left.png'
import scrollRight from '../img/arrow-right.png'
import pointer from '../img/pointer.png'
import semiBusyCursor from '../img/semi-busy.png'
import Select from '../atoms/Select'

function getCursor(semiBusy) {
  if (semiBusy) return css`url('${semiBusyCursor}') 0 0, progress`
  return css`url('${pointer}') 0 0, auto`
}

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
  user-select: none;
  cursor: ${({semiBusy}) => getCursor(semiBusy)};
  
  button {
    cursor: ${({semiBusy}) => getCursor(semiBusy)};
  }
  
  * {
    box-sizing: border-box;
  }
  
  *::-webkit-scrollbar {
    width: 16px;
    height: 16px;
  }

  *::-webkit-scrollbar-button:single-button {
    background-color: #c0c0c0;
    width: 16px;
    height: 16px;
    border-width: 2px;
    border-style: solid;
    border-image: url('${borderImage}') 2;
  }

  *::-webkit-scrollbar-button:single-button:active {
    border-image: url('${borderImageInset}') 2;
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
    border-width: 2px;
    border-style: solid;
    border-image: url('${borderImage}') 2;
  }
  
  *::selection {
    background-color: #000080;
    color: white;
  }
`

class Shell extends Component {
  render() {
    const { semiBusy, children } = this.props
    return (
      <Root className="reactows95-Shell" semiBusy={semiBusy}>
        {children}
      </Root>
    )
  }
}

Select.propTypes = {
  semiBusy: PropTypes.bool,
}

export default Shell
