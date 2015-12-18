
import PIXI from 'pixi.js'
import { Vector2 } from 'mathutil'

export default class Light {
  constructor( x, y ) {
    this.pos = new Vector2( x, y )

    this.view = new PIXI.Graphics()

    this.view.beginFill( 0xfff0b2, .5 )
    this.view.lineStyle( 1, 0xffffff, 1 )
    this.view.drawCircle( this.pos.x, this.pos.y, 8 )
    this.view.endFill()
  }
}
