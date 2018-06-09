import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import {
  Desktop,
  IconArea,
  Taskbar,
  TaskbarItem,
  RidgedGreyButton,
} from '../src'

storiesOf('Desktop', module)
  .add('with icon area and taskbar', () => (
    <Desktop>
      <IconArea/>
      <Taskbar onStartButtonClick={action('start button clicked')}>
        <TaskbarItem title="A window"/>
        <TaskbarItem title="Another window"/>
        <TaskbarItem title="Long title on another window"/>
      </Taskbar>
    </Desktop>
  ))
  .add('with lots of taskbar items', () => (
    <Desktop>
      <IconArea/>
      <Taskbar>
        {(new Array(30)).fill(1).map((val, i) => <TaskbarItem title="A window" key={i}/>)}
      </Taskbar>
    </Desktop>
  ))

storiesOf('RidgedGreyButton', module)
  .add('normal', () => (
    <RidgedGreyButton>
      <span>Button</span>
    </RidgedGreyButton>
  ))
  .add('strong', () => (
    <RidgedGreyButton strongBorder>
      <span>Button</span>
    </RidgedGreyButton>
  ))
  .add('disabled', () => (
    <RidgedGreyButton disabled>
      <span>Button</span>
    </RidgedGreyButton>
  ))
