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
  WindowLayer,
  WordPad,
  defaultIcon,
} from '../src'

import folderIcon from './icon-folder.png'

function startMenuItemSelected(item) {
  action(item.label + ' selected')()
}

const startMenuItems = [
  { label: 'Programs', subMenuItems: [
      { label: 'Program 1', onSelect: startMenuItemSelected },
      { label: 'Program 2', onSelect: startMenuItemSelected },
      { label: 'Program 3', subMenuItems: [
          { label: 'herp', onSelect: startMenuItemSelected },
          { label: 'derp', onSelect: startMenuItemSelected },
        ] },
    ] },
  { label: 'Documents', onSelect: startMenuItemSelected },
  { label: 'Settings', onSelect: startMenuItemSelected },
  { label: 'Find', onSelect: startMenuItemSelected },
  { label: 'Help', onSelect: startMenuItemSelected },
  { label: 'Run...', onSelect: startMenuItemSelected },
  'divider',
  { label: 'Shut down...', onSelect: startMenuItemSelected },
]


storiesOf('Shell', module)
  .add('with a window', () => (
    <Shell>
      <Desktop>
        <IconArea desktop iconTextColor="white">
          <IconRegular label="An icon" icon={folderIcon} onDoubleClick={action('icon double clicked')}/>
          <IconRegular label="Another icon" onDoubleClick={action('icon double clicked')}/>
          <IconRegular label="A third icon" onDoubleClick={action('icon double clicked')}/>
        </IconArea>
        <WindowLayer>
          <Folder icon={folderIcon} title="A window" hasFocus>
            {(new Array(30)).fill(1).map((val, i) => <IconRegular label="And YOU get an icon!" key={i}/>)}
          </Folder>
          <WordPad icon={defaultIcon} hasFocus onRequestClose={action('tried to close wordpad')}>
            <h1>Content!</h1>
            <p>Here's some content. Here's some content. Here's some content. Here's some content. Here's some content. Here's some content.</p>
            <img src="http://lorempixel.com/400/300/cats/" alt="Obligatory cat photo"/>
          </WordPad>
        </WindowLayer>
      </Desktop>
      <Taskbar startMenuItems={startMenuItems}>
        <TaskbarItem title="A taskbar item" icon={folderIcon}/>
        <TaskbarItem title="Another taskbar item" icon={folderIcon}/>
        <TaskbarItem title="Long title on another taskbar item" icon={folderIcon}/>
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

storiesOf('Scroll bars', module)
  .add('horizontal and vertical', () => (
    <Shell>
      <div style={{width: 300, height: 300, overflow: 'scroll'}}>
        <div style={{width: 600, height: 600, background: 'white'}}>
          content
        </div>
      </div>
    </Shell>
  ))
