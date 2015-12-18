
import PIXI from 'pixi.js'
import Stats from 'stats.js'
import { Vector2 } from 'mathutil'
import Poly from './poly'
import Light from './light'
import ShadowMap from './shadowMap'

const WIDTH = 256
const HEIGHT = 256

var stats = new Stats()
stats.domElement.style.position = 'absolute';
stats.domElement.style.right = '0px';
stats.domElement.style.top = '0px';
document.body.appendChild( stats.domElement )

var renderer = PIXI.autoDetectRenderer( WIDTH, HEIGHT, {
  antialias: true
})
renderer.backgroundColor = 0x434343
window.renderer = renderer
document.body.appendChild( renderer.view )

var stage = new PIXI.Container()

init()


function init() {
  var poly = new Poly([
    [ 112, 160 ],
    [ 144, 160 ],
    [ 144, 192 ],
    [ 112, 192 ]
  ])

  var light = new Light( 128, 128 )

  var shadow = new ShadowMap( light, poly )

  // render shadows first for now
  stage.addChild( shadow.view )
  
  stage.addChild( poly )
  stage.addChild( light.view )


  // Render static shadow map
  shadow.render()

  render()
}

function render() {
  requestAnimationFrame( render )
  stats.begin()
  renderer.render( stage )
  stats.end()
}
