import { Map as LeafletMap, Marker, TileLayer } from 'leaflet'
import { ClickCallback, ClickHandler, Coords } from '@/model/types'
import { Point } from '@/model/point'

function noop() {}

export class OpenMap {
  private map: LeafletMap | null = null
  private fn: ClickCallback | null = null
  private clickHandler: ClickHandler = noop
  private markers: Marker[] = []

  constructor(private coords: Coords = [51.958, 9.141]) {}

  createMap(selector: string) {
    if (this.map) {
      throw new Error('Map exists')
    }
    const mapOptions = { center: this.coords, zoom: 10 }
    this.map = new LeafletMap(selector, mapOptions)
    const layer = new TileLayer(
      'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    )
    this.map.addLayer(layer)
    // const marker = new Marker([51.958, 9.141])
    // marker.addTo(this.map)
  }

  destroyMap() {
    if (!this.map) {
      throw new Error('Map does not exist')
    }
    this.clearClickHandler()
    this.map?.remove()
    this.map = null
  }

  assertMap() {
    if (!this.map) {
      throw new Error('No map')
    }
  }

  drawPoints(points: Coords[]) {
    this.assertMap()
    points.forEach((p) => {
      const marker = new Marker(p)
      this.markers.push(marker)
      marker.addTo(this.map!)
    })
  }

  clearPoints() {
    this.assertMap()
    this.markers.forEach((m) => {
      m.remove()
    })
  }

  setClickHandler(handler: ClickHandler) {
    this.clickHandler = handler
    this.map!.on('click', this.clickHandler)
  }

  clearClickHandler() {
    this.map!.off('click', this.clickHandler)
    this.clickHandler = noop
  }
}

export default new OpenMap()
