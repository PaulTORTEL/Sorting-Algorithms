import React from 'react';
import './content.css';
import MainMenu from '../main-menu/main-menu';
import Viewport from '../viewport/viewport';

function Content() {
  return (
    <div id="main-content">
      <MainMenu />
      <Viewport />
    </div>
  );
}

export default Content;
