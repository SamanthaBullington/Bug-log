import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { bugsService } from '../services/BugsService'

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .get('', this.getAllBugs)
      .get('/:id', this.getOneBugById)
      // .get('/:id/notes', this.getAllNotesByBugId)
      .put('/:id', this.editBug)
      // .delete('/:id', this.deleteBug)
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
      const bug = await bugsService.edit(req.body)
      res.send(bug)
    } catch (error) {
      next(error)
    }
  }
}
