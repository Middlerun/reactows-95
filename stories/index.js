import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Desktop from '../src/Desktop';
import DesktopIconArea from '../src/DesktopIconArea';
import Taskbar from '../src/Taskbar';

storiesOf('Desktop', module)
  .add('with icon area and taskbar', () => (
    <Desktop>
      <DesktopIconArea/>
      <Taskbar onStartButtonClick={action('start button clicked')}/>
    </Desktop>
  ));
