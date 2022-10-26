import { TPointData, TStorePoint } from '@/model/types'

export class Point {
  description = ''
  public id: string = ''
  coords: [number, number] = [0, 0]
  published = false
  moderated = false
  userId: string = ''
  created = Date.now()
  files: string[] = []

  constructor(data: TPointData) {
    this.id = data.id
    this.description = data.description
    this.userId = data.userId
    this.published = data.published
    this.coords = data.coords
    this.created = data.created
    this.files = data.files
  }

  getErrors() {
    let errors = []

    if (!this.description) {
      errors.push('No description')
    }

    if (!this.userId) {
      errors.push('No user id')
    }

    if (!this.isVaildCoords()) {
      errors.push('Invalid coordinates')
    }

    return errors
  }

  isSaveable() {
    return !this.getErrors().length
  }

  isVaildCoords() {
    return this.coords && (this.coords[0] !== 0 || this.coords[1] !== 0)
  }

  toStore() {
    if (!this.isSaveable()) {
      throw new Error(this.getErrors()[0])
    }
    return [
      this.id,
      {
        description: this.description,
        userId: this.userId,
        published: this.published || true,
        coords: this.coords,
        created: this.created,
        files: this.files,
      },
    ] as [string, TStorePoint]
  }
}
