import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import {
  Desktop,
  Folder,
  IconArea,
  IconRegular,
  RidgedButton,
  Shell,
  Taskbar,
  TaskbarItem,
  Window,
  WindowLayer,
} from '../src'

storiesOf('Shell', module)
  .add('with a window', () => (
    <Shell>
      <Desktop>
        <IconArea desktop iconTextColor="white">
          <IconRegular label="An icon" onDoubleClick={action('icon double clicked')}/>
          <IconRegular label="Another icon" onDoubleClick={action('icon double clicked')}/>
          <IconRegular label="A third icon" onDoubleClick={action('icon double clicked')}/>
        </IconArea>
        <WindowLayer>
          <Folder title="A window" hasFocus/>
        </WindowLayer>
      </Desktop>
      <Taskbar onStartButtonClick={action('start button clicked')}>
        <TaskbarItem title="A taskbar item"/>
        <TaskbarItem title="Another taskbar item"/>
        <TaskbarItem title="Long title on another taskbar item"/>
      </Taskbar>
    </Shell>
  ))
  .add('with lots of icons', () => (
    <Shell>
      <Desktop>
        <IconArea desktop iconTextColor="white">
          {(new Array(30)).fill(1).map((val, i) => <IconRegular label="And YOU get an icon!" key={i}/>)}
        </IconArea>
      </Desktop>
      <Taskbar/>
    </Shell>
  ))
  .add('with lots of taskbar items', () => (
    <Shell>
      <Desktop>
        <IconArea desktop/>
      </Desktop>
      <Taskbar>
        {(new Array(30)).fill(1).map((val, i) => <TaskbarItem title="A taskbar item" key={i}/>)}
      </Taskbar>
    </Shell>
  ))

storiesOf('RidgedButton', module)
  .add('normal', () => (
    <RidgedButton>
      <span>Button</span>
    </RidgedButton>
  ))
  .add('strong', () => (
    <RidgedButton strongBorder>
      <span>Button</span>
    </RidgedButton>
  ))
  .add('disabled', () => (
    <RidgedButton disabled>
      <span>Button</span>
    </RidgedButton>
  ))
