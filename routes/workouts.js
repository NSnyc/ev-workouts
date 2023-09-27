import { Router } from 'express'
import * as workoutsCtrl from '../controllers/workouts.js'

const router = Router()

router.get('/', workoutsCtrl.index)
router.get('/new', workoutsCtrl.new)
router.post('/', workoutsCtrl.create)

export {
  router
}