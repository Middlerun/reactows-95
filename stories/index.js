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
  WordPad,
} from '../src'
import {
  ICON_FOLDER,
  ICON_RICH_TEXT,
} from '../src/icons'

storiesOf('Shell', module)
  .add('with a window', () => (
    <Shell>
      <Desktop>
        <IconArea desktop iconTextColor="white">
          <IconRegular label="An icon" icon={ICON_FOLDER} onDoubleClick={action('icon double clicked')}/>
          <IconRegular label="Another icon" onDoubleClick={action('icon double clicked')}/>
          <IconRegular label="A third icon" onDoubleClick={action('icon double clicked')}/>
        </IconArea>
        <WindowLayer>
          <Folder title="A window" hasFocus>
            {(new Array(30)).fill(1).map((val, i) => <IconRegular label="And YOU get an icon!" icon={ICON_RICH_TEXT} key={i}/>)}
          </Folder>
          <WordPad>
            <h1>Content!</h1>
            <p>Here's some content. Here's some content. Here's some content. Here's some content. Here's some content. Here's some content.</p>
            <img src="http://lorempixel.com/400/300/cats/"/>
          </WordPad>
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

storiesOf('Scroll bars', module)
  .add('horizontal and vertical', () => (
    <Shell>
      <div style={{width: 300, height: 300, overflow: 'scroll'}}>
        <div style={{width: 600, height: 600, background: 'white'}}>
          content
        </div>
      </div>
      <textarea style={{width: 300, height: 70}}>
        herp herp herp herp herp herp herp herp herp herp herp herp herp herp herp herp herp herp herp herp herp herp herp herp herp herp herp herp herp herp herp herp herp herp herp herp herp herp herp herp herp herp herp herp herp herp herp herp herp herp herp herp herp
      </textarea>
    </Shell>
  ))
