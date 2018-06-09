import GreyBox from './GreyBox'

import borderImage from '../img/light-border-inset.png'

export default GreyBox.extend`
  border-width: 1px;
  border-style: solid;
  border-image: url('${borderImage}') 1;
`
