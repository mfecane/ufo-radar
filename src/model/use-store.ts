import { defineStore } from 'pinia'
import { EditorData, Point, State, Views } from '@/model/types'
import { LeafletMouseEvent } from 'leaflet'

export const useStore = defineStore('points', {
  state: (): State => {
    return {
      points: [],
      // showActivePoint: false,
      activePoint: null,
      currentView: Views.list,
      editor: {
        data: {
          coords: [0, 0],
          description: '',
        },
      },
    }
  },

  actions: {
    init(points: Point[]) {
      this.points = points
    },

    click(activePoint: LeafletMouseEvent) {
      this.activePoint = activePoint.latlng
    },

    // setActivePoint(val: boolean) {
    //   this.showActivePoint = val
    // },

    setCurrentView(view: Views) {
      this.currentView = view
    },

    updateEditor(data: EditorData) {
      this.editor.data = data
    },
  },

  getters: {
    showActivePoint(state) {
      return state.currentView === Views.editor
    },
  },
})
