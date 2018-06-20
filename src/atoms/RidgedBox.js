import GreyBox from './GreyBox'
import PropTypes from 'prop-types'

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

const RidgedBox = GreyBox.extend`
  border-width: 2px;
  border-style: solid;
  border-image: url('${selectBorderImage}') ${selectBorderWidth};
`

RidgedBox.propTypes = {
  inset: PropTypes.bool,
  strongBorder: PropTypes.bool,
}

export { borderImage }
export { borderImageInset }
export default RidgedBox
