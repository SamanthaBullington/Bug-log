import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
class BugsService {
  async getAll(query = {}) {
    return await dbContext.Bugs.find(query).populate('creator', 'name picture')
  }

  async getOne(id) {
    return await dbContext.Bugs.findById(id).populate('creator', 'name picture')
  }

  async create(body) {
    const bug = await dbContext.Bugs.create(body)
    return await dbContext.Bugs.findById(bug.id).populate('creator', 'name picture')
  }

  async edit(body, id, userId) {
    const bug = await dbContext.Bugs.findOneAndUpdate({ _id: id, creatorId: userId }, body, { new: true, runValidators: true })
    // const bug = await dbContext.Bugs.findOneAndUpdate(body.id, body, { new: true })
    if (!bug) {
      throw new BadRequest('no bug to edit')
    } else if (bug.closed) {
      throw new BadRequest('bug is closed')
    }
    return bug
  }
}
export const bugsService = new BugsService()
