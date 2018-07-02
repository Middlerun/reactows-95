import styled from 'styled-components'

export const TitleBar = styled.div`
  height: 18px;
  width: 100%;
  padding: 0 2px;
  display: flex;
  align-items: center;
  background-color: ${({hasFocus}) => hasFocus ? '#000082' : '#808080'};
  color: ${({hasFocus}) => hasFocus ? 'white' : '#c0c0c0'};
  font-weight: bold;
  margin-bottom: 2px;
  user-select: none;
`

export const IconImage = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 2px;
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
`

export const TitleWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`
