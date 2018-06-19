import React, { Fragment } from 'react'

export default function underlinedLabel(label, underline) {
  if (typeof underline === 'undefined') {
    return label
  }

  const piece1 = label.substr(0, underline)
  const piece2 = label.substr(underline, 1)
  const piece3 = label.substr(underline + 1)

  return <Fragment>{piece1}<u>{piece2}</u>{piece3}</Fragment>
}
