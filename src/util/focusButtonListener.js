export default function focusButtonListener(component, callback, keySelector, eventType = 'keydown') {
  let filteredCallback = (e) => {
    if (
      component.props.hasFocus &&
      (
        !keySelector ||
        keySelector.hasOwnProperty('key') && keySelector.key === e.key ||
        keySelector.hasOwnProperty('which') && keySelector.which === e.which ||
        keySelector.hasOwnProperty('code') && keySelector.code === e.code
      )
    ) {
      callback(e)
    }
  }

  addEventListener(eventType, filteredCallback)
  console.log('added event listener')

  return {
    remove: () => {
      removeEventListener(eventType, filteredCallback)
      console.log('removed event listener')
      filteredCallback = null
    }
  }
}
