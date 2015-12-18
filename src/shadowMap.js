
import PIXI from 'pixi.js'
import { Vector2 } from 'mathutil'

export default class ShadowMap {
  constructor( light, shape ) {
    this.light = light
    this.shape = shape


    this.view = new PIXI.Graphics()

  }

  render() {
    this.view.clear()

    var points = this.shape.points
    var light = this.light

    this.view.beginFill( 0x000000, .95 )
    this.view.moveTo( 128,128 )

    for ( var i = 1; i <= points.length; i++ ) {
      let p = i % points.length
      // let point = new Vector2({
      //   head: {
      //     x: points[ p ].x,
      //     y: points[ p ].y
      //   },
      //   origin: {
      //     x: light.pos.x,
      //     y: light.pos.y
      //   }
      // })

      // Project p by removing light origin, scaling and reapplying position
      // mathutil should do this when given an origin
      let point = points[ p ]
      point = point.sub( this.light.pos )
      point = point.scalar( 1.6 ).add( this.light.pos )

      console.log( point.head.x, point.head.y, point.origin.x, point.origin.y )
      this.view.lineTo( point.x, point.y )

    }
    this.view.endFill()
  }
}
