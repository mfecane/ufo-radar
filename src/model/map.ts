import { Map as LeafletMap, Marker, TileLayer } from 'leaflet'
import { ClickCallback, ClickHandler, Coords } from '@/model/types'
import { Point } from '@/model/point'

function noop() {}

export class OpenMap {
  private map: LeafletMap | null = null
  private fn: ClickCallback | null = null

  private currentPoint: Coords | null = null
  private currentPointMarker?: Marker
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

  addMarkers(points: Point[]) {
    const markers = points.map((p) => p.coords)
    if (!this.map) {
      throw new Error('No map')
    }
    markers.forEach((markerCoords) => {
      const marker = new Marker(markerCoords)
      marker.addTo(this.map!)
    })
  }

  assertMap() {
    if (!this.map) {
      throw new Error('No map')
    }
  }

  drawPoints(points: Point[]) {
    this.assertMap()
    points.forEach((p) => {
      const marker = new Marker(p.coords)
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

  // addEventListener(fn: ClickCallback) {
  //   if (this.fn) {
  //     this.removeEventListener()
  //   }
  //   this.fn = fn
  //   this.map!.on('click', (arg) => {
  //     this.clickHandler(arg)
  //   })
  // }

  // removeEventListener() {
  //   if (this.map && this.fn) {
  //     this.map.off('click', this.fn)
  //     this.fn = null
  //   }
  // }

  setCurrentPoint(point: Point) {
    this.removeCurrentPoint()
    this.currentPoint = point.coords
    this.currentPointMarker = new Marker(point.coords)
    this.currentPointMarker.addTo(this.map!)
  }

  removeCurrentPoint() {
    if (this.currentPoint && this.currentPointMarker) {
      this.currentPointMarker.remove()
      this.currentPoint = null
    }
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
