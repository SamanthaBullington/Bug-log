import { dbContext } from '../db/DbContext'

class NotesService {
  async create(body) {
    const note = await dbContext.Notes.create(body)
    return await dbContext.Notes.findById(note._id).populate('creator', 'name picture')
  }
}
export const notesService = new NotesService()
