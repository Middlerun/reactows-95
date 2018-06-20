import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import defaultIcon from '../img/icon-default.png'

const Root = styled.div`
  width: 75px;
  height: 75px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ImageContainer = styled.div`
  position: relative;
  width: 32px;
  height: 32px;
  margin-top: 2px;
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
`

const IconImage = styled.button`
  width: 32px;
  height: 32px;
  padding: 0;
  border: 0;
  background-color: transparent;
  background-image: url('${({image}) => image}');
  
  :focus {
    outline: 0;
    
    :before {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0,0,127, 0.5);
      mask-image: url('${({image}) => image}');
      mask-size: 32px 32px;
    }
  }
  
  ::-moz-focus-inner {
    border: 0;
  }
`

const IconText = styled.div`
  display: inline-block;
  margin-top: 3px;
  padding: 1px 2px;
  max-width: calc(100% - 6px);
  line-height: 1.2em;
  max-height: calc(2.4em + 2px);
  text-align: center;
  overflow: hidden;
  user-select: none;
  background-color: ${({hasFocus}) => hasFocus ? '#00007b' : 'transparent'};
  ${({hasFocus}) => hasFocus && 'color: white;'};
`

const DOUBLE_CLICK_TIMEOUT = 500

class IconRegular extends Component {
  constructor() {
    super()
    this.state = { hasFocus: false }
    this.doubleClickTimer = null
  }

  onClick = (e) => {
    this.props.onClick && this.props.onClick(e)

    if (this.doubleClickTimer) {
      clearTimeout(this.doubleClickTimer)
      this.doubleClickTimer = null
      this.props.onDoubleClick && this.props.onDoubleClick(e)
    } else {
      this.doubleClickTimer = setTimeout(() => {
        this.doubleClickTimer = null
      }, DOUBLE_CLICK_TIMEOUT)
    }
  }

  onFocus = (e) => {
    this.props.onFocus && this.props.onFocus(e)
    this.setState({ hasFocus: true })
  }

  onBlur = (e) => {
    this.props.onBlur && this.props.onBlur(e)
    this.setState({ hasFocus: false })
  }

  render() {
    const { label, icon } = this.props
    const { hasFocus } = this.state

    return (
      <Root className="reactows95-Icon reactows95-IconRegular">
        <ImageContainer>
          <IconImage
            image={icon || defaultIcon}
            onClick={this.onClick}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            innerRef={el => this.button = el}
          />
        </ImageContainer>
        <IconText
          hasFocus={hasFocus}
          onClick={() => {
            this.button.focus();
            this.button.click();
          }}
        >
          {label}
        </IconText>
      </Root>
    )
  }
}

IconRegular.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  onDoubleClick: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
}

export default IconRegular
