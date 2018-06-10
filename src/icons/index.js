import icon1 from './32/icon-1.png'
import icon2 from './32/icon-2.png'
import icon3 from './32/icon-3.png'
import icon4 from './32/icon-4.png'
import icon5 from './32/icon-5.png'
import icon1Small from './16/icon-1.png'
import icon2Small from './16/icon-2.png'
import icon3Small from './16/icon-3.png'
import icon4Small from './16/icon-4.png'
import icon5Small from './16/icon-5.png'

export const ICON_DEFAULT = 1
export const ICON_RICH_TEXT = 2
export const ICON_APPLICATION = 3
export const ICON_FOLDER = 4
export const ICON_FOLDER_OPEN = 5

export const iconSets = {
  small: {
    [ICON_DEFAULT]: icon1Small,
    [ICON_RICH_TEXT]: icon2Small,
    [ICON_APPLICATION]: icon3Small,
    [ICON_FOLDER]: icon4Small,
    [ICON_FOLDER_OPEN]: icon5Small,
  },
  standard: {
    [ICON_DEFAULT]: icon1,
    [ICON_RICH_TEXT]: icon2,
    [ICON_APPLICATION]: icon3,
    [ICON_FOLDER]: icon4,
    [ICON_FOLDER_OPEN]: icon5,
  },
}

export function getIcon(id, small = false) {
  const iconSet = small ? iconSets.small : iconSets.standard
  if (!id) {
    return iconSet[ICON_DEFAULT]
  }
  if (Number.isInteger(id)) {
    return iconSet[id] || iconSet[ICON_DEFAULT]
  }
  return id
}
