import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { notesService } from '../services/NotesService'
import { dbContext } from '../db/DbContext'

export class NotesController extends BaseController {
  constructor() {
    super('api/notes')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:id', this.closeNote)
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const note = await notesService.create(req.body)
      res.send(note)
    } catch (error) {
      next(error)
    }
  }

  async closeNote(req, res, next) {
    try {
      const note = await notesService.destroy(req.params.id, req.userInfo.id)
      res.send({ message: 'Note deleted.' })
    } catch (error) {
      next(error)
    }
  }
}
