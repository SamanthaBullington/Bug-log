import { AppState } from '../AppState'
import Pop from '../utils/Notifier'
import { api } from './AxiosService'

class NotesService {
  async getNotesByBugId(id) {
    const res = await api.get('api/bugs/' + id)
    AppState.notes = res.data
  }

  async create(newNote) {
    const res = await api.post('api/notes', newNote)
    AppState.notes.push(res.data)
  }

  async delete(id) {
    if (await Pop.confirm()) {
      try {
        const res = await api.delete('api/notes/' + id)
        Pop.toast(res.data.message, 'success')
        AppState.notes = AppState.notes.filter(n => n.id !== id)
      } catch (error) {
        Pop.toast(error)
      }
    }
  }
}

export const notesService = new NotesService()
