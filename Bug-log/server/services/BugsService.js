import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'
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
    // This find one should also check if the bug is closed, do not allow edits to closed bugs
    const bug = await dbContext.Bugs.findOneAndUpdate({ _id: id, creatorId: userId, closed: false }, body, { new: true, runValidators: true })
    if (!bug) {
      throw new BadRequest('no bug to edit')
    }
    // if (bug.creatorId.toString() !== id) {
    //   throw new Forbidden('This is not your bug')
    // }
    // WHY DOESNT THIS CODE WORK? ^^^
    return bug
  }

  async closeBug(bug, id) {
    const currentBug = await this.getOne(bug.id)
    if (!currentBug) {
      throw new BadRequest('Invalid Id')
    }
    if (currentBug.creatorId.toString() !== id) {
      throw new Forbidden('This is not your bug')
    }
    currentBug.closed = true
    const closedBug = await dbContext.Bugs.findByIdAndUpdate(currentBug.id, { closed: true }, { new: true, runValidators: true }).populate('creator')
    return closedBug
  }

//   async destroy(id, userId) {
//     const bug = await dbContext.Bugs.findById(id)
//     if (!bug) {
//       throw new BadRequest('Invalid ID')
//     }
//     if (bug.creatorId.toString() !== userId) {
//       throw new Forbidden('This is not your bug')
//     }
//     return await dbContext.Bugs.findByIdAndDelete(id)
//   }
}
export const bugsService = new BugsService()
