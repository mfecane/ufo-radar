import {
  Map as LeafletMap,
  LatLngTuple,
  Marker,
  TileLayer,
  LeafletMouseEvent,
} from 'leaflet'
// import coordinates from '@/model/coordinates'
import { ClickCallback, ClickHandler, Point } from '@/model/types'

// TODO add setClickHandler

function noop() {}

export class OpenMap {
  private static instance: OpenMap
  private map?: LeafletMap
  private fn: ClickCallback | null = null

  private currentPoint: Point | null = null
  private currentPointMarker?: Marker
  private clickHandler: ClickHandler = noop

  constructor(private coords: LatLngTuple = [51.958, 9.141]) {}

  public static getInstance(): OpenMap {
    if (!OpenMap.instance) {
      OpenMap.instance = new OpenMap()
    }
    return OpenMap.instance
  }

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
    const marker = new Marker([51.958, 9.141])
    marker.addTo(this.map)
  }

  destroyMap() {
    if (!this.map) {
      throw new Error('Map does not exist')
    }
    this.clearClickHandler()
    this.map?.remove()
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
    this.currentPoint = point
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
