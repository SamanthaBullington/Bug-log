import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { bugsService } from '../services/BugsService'
import { notesService } from '../services/NotesService'

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .get('', this.getAllBugs)
      .get('/:id', this.getOneBugById)
      .get('/:id/notes', this.getNotesByBugId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.editBug)
      // .delete('/:id', this.closeBug)
      .delete('/:id', this.deleteBug)
  }

  async getAllBugs(req, res, next) {
    try {
      const bugs = await bugsService.getAll()
      res.send(bugs)
    } catch (error) {
      next(error)
    }
  }

  async getOneBugById(req, res, next) {
    try {
      const bug = await bugsService.getOne(req.params.id)
      res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const bug = await bugsService.create(req.body)
      res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async editBug(req, res, next) {
    try {
      req.body.id = req.params.id
      // remove the closed property from the req.body so it cannot be edited on a put
      delete req.body.closed
      const bug = await bugsService.edit(req.body, req.params.id, req.userInfo.id)
      res.send(bug)
    } catch (error) {
      next(error)
    }
  }
  // async closeBug(req, res, next) {
  //   try {
  //     req.body.id = req.params.id
  //     req.body.creatorId = req.userInfo.id

  //     const bug = await bugsService.closeBug(req.body, req.userInfo.id)
  //     res.send(bug)
  //   } catch (error) {
  //     next(error, 'error')
  //   }
  // }

  async deleteBug(req, res, next) {
    try {
      const bug = await bugsService.destroy(req.params.id, req.userInfo.id)
      res.send({ message: `Bug ${bug.title} deleted` })
    } catch (error) {
      next(error)
    }
  }

  async getNotesByBugId(req, res, next) {
    try {
      const notes = await notesService.getNotesByBugId(req.params.id)
      res.send(notes)
    } catch (error) {
      next(error, 'error')
    }
  }
}
