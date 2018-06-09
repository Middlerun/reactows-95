import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import {
  Desktop,
  IconArea,
  IconRegular,
  Taskbar,
  TaskbarItem,
  RidgedGreyButton,
} from '../src'

storiesOf('Desktop', module)
  .add('with icons and taskbar', () => (
    <Desktop>
      <IconArea desktop iconTextColor="white">
        <IconRegular label="An icon" onDoubleClick={action('icon double clicked')}/>
        <IconRegular label="Another icon" onDoubleClick={action('icon double clicked')}/>
        <IconRegular label="A third icon" onDoubleClick={action('icon double clicked')}/>
      </IconArea>
      <Taskbar onStartButtonClick={action('start button clicked')}>
        <TaskbarItem title="A window"/>
        <TaskbarItem title="Another window"/>
        <TaskbarItem title="Long title on another window"/>
      </Taskbar>
    </Desktop>
  ))
  .add('with lots of icons', () => (
    <Desktop>
      <IconArea desktop iconTextColor="white">
        {(new Array(30)).fill(1).map((val, i) => <IconRegular label="And YOU get an icon!" key={i}/>)}
      </IconArea>
      <Taskbar/>
    </Desktop>
  ))
  .add('with lots of taskbar items', () => (
    <Desktop>
      <IconArea desktop/>
      <Taskbar>
        {(new Array(30)).fill(1).map((val, i) => <TaskbarItem title="A taskbar item" key={i}/>)}
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
