import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Desktop from '../src/Desktop';
import DesktopIconArea from '../src/DesktopIconArea';
import Taskbar from '../src/Taskbar';
import TaskbarItem from '../src/TaskbarItem';

storiesOf('Desktop', module)
  .add('with icon area and taskbar', () => (
    <Desktop>
      <DesktopIconArea/>
      <Taskbar onStartButtonClick={action('start button clicked')}>
        <TaskbarItem title="A window"/>
        <TaskbarItem title="Another window"/>
        <TaskbarItem title="Long title on another window"/>
      </Taskbar>
    </Desktop>
  ))
  .add('with lots of taskbar items', () => (
    <Desktop>
      <DesktopIconArea/>
      <Taskbar>
        {(new Array(30)).fill(1).map((val, i) => <TaskbarItem title="A window" key={i}/>)}
      </Taskbar>
    </Desktop>
  ));
