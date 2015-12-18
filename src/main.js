
import PIXI from 'pixi.js'
import Stats from 'stats.js'
import { Vector2 } from 'mathutil'
import Quay from 'quay'

import Poly from './poly'
import Light from './light'
import ShadowMap from './shadowMap'

const WIDTH = 256
const HEIGHT = 256
const MOVE_SPEED = 2

var stats = new Stats()
stats.domElement.style.position = 'absolute';
stats.domElement.style.right = '0px';
stats.domElement.style.top = '0px';
document.body.appendChild( stats.domElement )

var quay = new Quay()

var renderer = PIXI.autoDetectRenderer( WIDTH, HEIGHT, {
  antialias: true
})
renderer.backgroundColor = 0x434343
window.renderer = renderer
document.body.appendChild( renderer.view )

renderer.view.addEventListener( 'click', event => {
  console.log( event.clientX, event.clientY )
})

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

  // Apply handlers
  quay.on( '<left>', () => {
    poly.translate( new Vector2( -MOVE_SPEED, 0 ) )
    shadow.render()
  })
  quay.on( '<right>', () => {
    poly.translate( new Vector2( MOVE_SPEED, 0 ) )
    shadow.render()
  })
  quay.on( '<up>', () => {
    poly.translate( new Vector2( 0, -MOVE_SPEED ) )
    shadow.render()
  })
  quay.on( '<down>', () => {
    poly.translate( new Vector2( 0, MOVE_SPEED ) )
    shadow.render()
  })

  // Add mousemove to shape
  renderer.view.addEventListener( 'mousemove', event => {
    poly.to( new Vector2( event.clientX, event.clientY ) )
    shadow.render()
  })

  // expose debug globals
  window.shape = poly
  window.light = light
  window.shadow = shadow
}

function render() {
  requestAnimationFrame( render )
  stats.begin()
  renderer.render( stage )
  stats.end()
}
