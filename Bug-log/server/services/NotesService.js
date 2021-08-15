import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class NotesService {
  async create(body) {
    const note = await dbContext.Notes.create(body)
    return await dbContext.Notes.findById(note._id).populate('creator', 'name picture').populate('bug', '_id')
  }

  async getNotesByBugId(id) {
    const notes = await dbContext.Notes.find({ bugId: id }).populate('creator', 'name picture').populate('bug')
    return notes
  }

  async destroy(id, userId) {
    const note = await dbContext.Notes.findById(id)
    if (!note) {
      throw new BadRequest('No note to delete')
    }
    if (note.creatorId.toString() !== userId) {
      throw new Forbidden('This is not your Note')
    }
    return await dbContext.Notes.findByIdAndDelete(id)
  }
}
export const notesService = new NotesService()
