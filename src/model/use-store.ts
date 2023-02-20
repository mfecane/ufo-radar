import { defineStore } from 'pinia'
import { EditorData, EFormTypes, State, Views, Coords } from '@/model/types'
import { LeafletMouseEvent } from 'leaflet'
import { Point } from '@/model/point'

export const useStore = defineStore('points', {
  state: (): State => {
    return {
      map: {
        points: [],
        activePoint: null,
      },
      formScreen: EFormTypes.none,
      points: [],
      // showActivePoint: false,
      currentView: Views.list,
      editor: {
        data: null,
      },
      currentUser: null,
    }
  },

  actions: {
    init(points: Point[]) {
      this.points = points
    },

    updateEditor(data: Point) {
      this.editor.data = data
    },

    addFile(f: string) {
      this.editor.data!.files.push(f)
    },

    setFormScreen(type?: EFormTypes) {
      if (!type) {
        this.formScreen = EFormTypes.none
        return
      }
      this.formScreen = type
    },

    setCurrentUser(user) {
      if (!user) {
        this.currentView = Views.list
      }
      this.currentUser = user
    },

    setMapPoints(points: Coords[]) {
      this.map.points = points
    },

    clearMapPoints() {
      this.map.points = []
    },

    setActivePoint(p: LeafletMouseEvent) {
      this.map.activePoint = [p.latlng.lat, p.latlng.lng]
    },

    clearActivePoint() {
      this.map.activePoint = null
    },
  },

  getters: {
    showActivePoint(state) {
      return state.currentView === Views.editor
    },
  },
})
