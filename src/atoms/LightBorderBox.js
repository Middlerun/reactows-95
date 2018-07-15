import GreyBox from './GreyBox'

import borderImage from '../img/light-border.png'

export default GreyBox.extend`
  border-width: 2px;
  border-style: solid;
  border-image: url('${borderImage}') 2;
`
