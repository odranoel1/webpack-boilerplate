// SCSS (Styles)
import '../sass/main.scss';
//Add images
var images = require.context("../img", false);

import printMe from './print.js';

export default function component() {

  var btn = document.getElementById('button');
  btn.innerHTML = 'Hello From JS';

  btn.addEventListener('click',printMe);

  return btn;
}

document.body.appendChild(component());

// Activating HMR in Dev Server, Change print.js for autoreload
if (module.hot) {
 module.hot.accept('./print.js', function() {
   console.log('Accepting the updated printMe module!');
   printMe();
 })
}
