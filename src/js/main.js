import '../sass/main.scss'; //<-- Styles
require.context("../img", false); //<-- Images

import PrintMe from './modules/print.js';

var btn = document.getElementById('button');
btn.addEventListener('click',PrintMe);

console.log('Hello');
