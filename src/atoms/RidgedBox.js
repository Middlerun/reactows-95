import GreyBox from './GreyBox'

import borderImage from '../img/border.png'
import borderImageStrong from '../img/border-strong.png'
import borderImageInset from '../img/border-inset.png'

function selectBorderImage({inset, strongBorder}) {
  if (inset) {
    return borderImageInset
  } else if (strongBorder) {
    return borderImageStrong
  } else {
    return borderImage
  }
}

function selectBorderWidth({inset, strongBorder}) {
  return !inset && strongBorder ? 3 : 2
}

export default GreyBox.extend`
  border-width: 2px;
  border-style: solid;
  border-image: url('${selectBorderImage}') ${selectBorderWidth};
`

export { borderImage }
export { borderImageInset }
