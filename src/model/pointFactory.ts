import { Point } from '@/model/point'
import { TStorePoint } from '@/model/types'
import { getNewPointId } from '@/model/firebase'

export const createNewPoint = async (uid: string) => {
  const data: TStorePoint = {
    id: await getNewPointId(),
    description: '',
    userId: uid,
    created: Date.now(),
    coords: [0, 0],
    published: false,
    files: [],
  }
  return new Point(data)
}

export const createStorePoint = (data: TStorePoint) => {
  return new Point(data)
}
