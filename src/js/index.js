import printMe from './print.js';
import WebpackImg from '../img/webpack.png'; //Add Images
// import WebpackOldImg from './old-webpack.jpg';

export default function component() {
  var element = document.createElement('div');

  // Add the image to our existing div.
  var myIcon = new Image();
  myIcon.src = WebpackImg;

  element.appendChild(myIcon);

  var btn = document.createElement('button');
  btn.innerHTML = 'Hello From JS';

  btn.addEventListener('click',printMe);

  element.appendChild(btn);

  return element;
}

document.body.appendChild(component());

// Activating HMR in Dev Server, Change print.js for autoreload
// if (module.hot) {
//  module.hot.accept('./print.js', function() {
//    console.log('Accepting the updated printMe module!');
//    printMe();
//  })
// }
