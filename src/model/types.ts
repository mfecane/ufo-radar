import { LatLng, LeafletMouseEvent } from 'leaflet'
import { Point } from './point'

export type Coords = [number, number]

export type TPoint = {
  coords: Coords
  id: string
  descr?: string
}

export type ClickCallback = (e: LeafletMouseEvent) => void

export type EditorData = {
  description: string
  coords: Coords
  files: string[]
}

export type TUser = {
  uid: string
}

export interface State {
  formScreen: EFormTypes
  points: Point[]
  activePoint: LatLng | null
  // showActivePoint: boolean
  currentView: Views
  editor: {
    data: Point | null
  }
  currentUser: any
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

export enum EFormTypes {
  'none',
  'login',
  'signup',
  'edituser',
  'forgot',
  'created',
}

export interface TStorePoint {
  description: string
  moderated?: boolean
  published: boolean
  coords: Coords
  userId: string
  created: number
  files: string[]
}

export interface TPointData extends TStorePoint {
  id: string
}
