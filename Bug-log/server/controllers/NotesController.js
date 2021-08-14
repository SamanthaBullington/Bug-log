import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { notesService } from '../services/NotesService'

export class NotesController extends BaseController {
  constructor() {
    super('api/notes')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      // .delete('/:id', this.deleteNote)
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
}
