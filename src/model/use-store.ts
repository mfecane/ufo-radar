import { defineStore } from 'pinia'
import { EditorData, EFormTypes, State, Views } from '@/model/types'
import { LeafletMouseEvent } from 'leaflet'
import { Point } from '@/model/point'

export const useStore = defineStore('points', {
  state: (): State => {
    return {
      formScreen: EFormTypes.none,
      points: [],
      // showActivePoint: false,
      activePoint: null,
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

    click(activePoint: LeafletMouseEvent) {
      this.activePoint = activePoint.latlng
    },

    // setActivePoint(val: boolean) {
    //   this.showActivePoint = val
    // },

    setCurrentView(view: Views) {
      if (view === Views.editor && !this.currentUser) {
        this.currentView = Views.list
      }
      this.currentView = view
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
  },

  getters: {
    showActivePoint(state) {
      return state.currentView === Views.editor
    },
  },
})
