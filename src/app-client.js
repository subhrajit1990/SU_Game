'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import PlayGround from './components/PlayGround';

window.onload = () => {
  ReactDOM.render(<PlayGround/>, document.getElementById('main'));
};
