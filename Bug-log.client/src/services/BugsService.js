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

  async getOneBugById(id) {
    try {
      const res = await api.get('api/bugs/' + id)
      AppState.currentBug = res.data
    } catch (error) {
      Pop.toast(error, 'error')
    }
  }

  async create(newBug) {
    try {
      const res = await api.post('api/bugs', newBug)
      AppState.bugs.push(res.data)
      return res.data.id
    } catch (error) {
      Pop.toast(error)
    }
  }

  async delete(id) {
    if (await Pop.confirm()) {
      try {
        const res = await api.delete('api/bugs/' + id)
        Pop.toast(res.data.message, 'success')
        AppState.bugs = AppState.bugs.filter(b => b.id !== id)
      } catch (error) {
        Pop.toast(error)
      }
    }
  }

  async editClosed(bug, openStatus) {
    bug.closed = openStatus
    const res = await api.put('api/bugs/' + bug.id, bug)
  }

  async editBug(bug) {
    try {
      const res = await api.put('api/bugs/' + bug.id, bug)
      AppState.currentBug = res.data
      this.getOneBugById(bug.id)
    } catch (error) {
      Pop.toast(error)
    }
  }
}

export const bugsService = new BugsService()
