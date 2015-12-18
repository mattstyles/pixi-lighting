
var PIXI = require( 'pixi.js' )

const WIDTH = 256
const HEIGHT = 256

var stats = new Stats()
stats.domElement.style.position = 'absolute';
stats.domElement.style.right = '0px';
stats.domElement.style.top = '0px';

var renderer = PIXI.autoDetectRenderer( WIDTH, HEIGHT )
document.body.appendChild( renderer.view )

var stage = new PIXI.Container()

function init() {

}

function render() {
  requestAnimationFrame( render )
  stats.begin()
  renderer.render( stage )
  stats.end()
}
