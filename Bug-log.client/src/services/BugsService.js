import { AppState } from '../AppState'
import Pop from '../utils/Notifier'
import { api } from './AxiosService'

class BugsService {
  async getAll() {
    try {
      const res = await api.get('api/bugs')
      AppState.bugs = res.data
    } catch (error) {
      Pop.toast(error, 'error')
    }
  }

  // async create(newBug) {
  //   try {
  //     const res = await api.post('api/bugs', newBug)
  //     AppState.bugs.push(res.data)
  //     return res.data.id
  //   } catch (error) {
  //     Pop.toast(error)
  //   }
  // }
}

export const bugsService = new BugsService()
