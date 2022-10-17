import { LatLng, LeafletMouseEvent } from 'leaflet'

type Coords = [number, number]

export type Point = {
  coords: Coords
  id: string
  descr?: string
}

export type ClickCallback = (e: LeafletMouseEvent) => void

export type EditorData = {
  description: string
  coords: Coords
}

export interface State {
  points: Point[]
  activePoint: LatLng | null
  // showActivePoint: boolean
  currentView: Views
  editor: {
    data: EditorData
  }
}

export enum Views {
  'list',
  'editor',
}

export type ClickHandler = (() => void) | ((e: LeafletMouseEvent) => void)

export enum ButtonType {
  'default',
  'save',
  'cancel',
}
