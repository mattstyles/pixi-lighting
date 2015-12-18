
import PIXI from 'pixi.js'
import { Vector2 } from 'mathutil'

export default class Poly extends PIXI.Graphics {
  constructor( points ) {
    super()

    // cast to Vector2 is supplied as array
    this.points = points.map( point => {
      // let p = point instanceof Vector2
      //   ? [ point.x, point.y ]
      //   : p
      return point instanceof Vector2
        ? point
        : new Vector2( point[ 0 ], point[ 1 ] )
    })

    this.render()
  }

  translate( vec2 ) {
    this.points = this.points.map( point => point.add( vec2 ) )
    this.render()
  }

  // assumes a square, to be quick
  to( center ) {
    var width2 = this.width / 2
    var height2 = this.height / 2

    this.points = [
      new Vector2( center.x - width2, center.y - height2 ),
      new Vector2( center.x + width2, center.y - height2 ),
      new Vector2( center.x + width2, center.y + height2 ),
      new Vector2( center.x - width2, center.y + height2 )
    ]
    this.render()
  }

  // assume rect
  get width() {
    return this.points[ 1 ].x - this.points[ 0 ].x
  }
  get height() {
    return this.points[ 2 ].y - this.points[ 1 ].y
  }

  /**
   * Returns only those points which provide a bounding box
   */
  filterVisible( origin ) {
    // @using illuminated.js _forEachVisible
    var a = this.points[ this.points.length - 1 ]
    var b = this.points[ 0 ]
    var pushed = false

    // Use Set as it avoids duplicates
    var visible = new Set()

    for ( var p = 0; p < this.points.length; ++p ) {
      b = this.points[ p ]
      var originA = a.sub( origin )
      var originB = b.sub( origin )
      var aToB = b.sub( a )
      // calc edge normal and see if is close enough to light ray
      var normal = aToB.backfaceNormal()
      if ( normal.dot( originA ) < 0 ) {
        // This will produce duplicates with an array, so use a set to avoid
        visible.add( a )
        visible.add( b )
      }
      a = b
    }

    // cast from set to array, the callee will be expecting an array, although
    // maybe we should just use Maps and Sets all over anyway
    return Array.from( visible )
  }

  render() {
    // render - assumes a square at the moment
    var width = this.points[ 1 ].x - this.points[ 0 ].x
    var height = this.points[ 2 ].y - this.points[ 1 ].y

    this.clear()
    this.beginFill( 0xe1e4f0, .2 )
    this.drawRect( this.points[ 0 ].x, this.points[ 0 ].y, width, height )
    this.endFill()
  }
}
