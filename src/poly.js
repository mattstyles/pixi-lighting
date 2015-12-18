
import PIXI from 'pixi.js'
import { Vector2 } from 'mathutil'

export default class Poly extends PIXI.Graphics {
  constructor( points ) {
    super()

    this.points = points.map( point => {
      return new Vector2( point[ 0 ], point[ 1 ] )
    })

    // render
    var width = this.points[ 1 ].x - this.points[ 0 ].x
    var height = this.points[ 2 ].y - this.points[ 1 ].y

    this.beginFill( 0xe1e4f0 )
    this.drawRect( this.points[ 0 ].x, this.points[ 0 ].y, width, height )
    this.endFill()
  }
}
