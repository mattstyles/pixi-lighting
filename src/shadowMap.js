
import PIXI from 'pixi.js'
import { Vector2 } from 'mathutil'

export default class ShadowMap {
  constructor( light, shape ) {
    this.light = light
    this.shape = shape


    this.view = new PIXI.Graphics()

  }

  // Projects a vertex away from a light source
  // currently assumes one light source and just applies a scalar
  // should use a scalar based on inverse distance from source
  // using unit clamps vertex length to the scalar value
  project = vertex => {
    //let scalar = 1 - ( vertex.distance( this.light.pos ) / this.light.distance )
    return vertex
      .sub( this.light.pos )
      // .scalar( 1 + scalar )
      .unit()
      .scalar( 300 )
      .add( this.light.pos )
  }

  // Returns a list of vertices describing the shadow region
  region() {
    var points = this.shape.filterVisible( this.light.pos )

    let shadowRegion = []

    // Apply visible points to front face of the polygon
    points.forEach( point => shadowRegion.push( point ) )

    // Add projected points, project backwards across array to add the winding
    // we need to the resultant polygon
    var i = points.length - 1
    while ( i > -1 ) {
      shadowRegion.push( this.project( points[ i ] ) )
      i--
    }

    return shadowRegion
  }

  render() {

    var light = this.light
    var points = this.shape.filterVisible( light.pos )

    this.view.clear()


    // Draw shadow region
    this.view.beginFill( 0x000000, .95 )
    // convert to pixi.points for drawPolygon
    this.view.drawPolygon( this.region().map( point => new PIXI.Point( point.x, point.y ) ) )
    this.view.endFill()

    // Draw shadow over objects (due to vertex winding sometimes the shadowRegion
    // will not include all points correctly from the shape)
    this.view.beginFill( 0x000000, .95 )
    this.view.drawPolygon( this.shape.points.map( point => new PIXI.Point( point.x, point.y ) ) )
    this.view.endFill()

    // Draw visible vertices
    this.view.beginFill( 0xffff22, 1 )
    this.shape.filterVisible( this.light.pos ).forEach( vertex => {
      this.view.drawCircle( vertex.x, vertex.y, 2 )
    })
    this.view.endFill()
  }
}
