import GreyBox from './GreyBox'

import borderImage from '../img/border.png'
import borderImageInset from '../img/border-inset.png'

export default GreyBox.extend`
  border-width: 2px;
  border-style: solid;
  border-image: url('${({inset}) => inset ? borderImageInset : borderImage}') 2;
`

export { borderImage }
export { borderImageInset }
