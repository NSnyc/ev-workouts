import { Router } from 'express'
import * as workoutsCtrl from '../controllers/workouts.js'

const router = Router()

router.get('/', workoutsCtrl.index)
router.get('/new', workoutsCtrl.new)
router.get('/:workoutId', workoutsCtrl.show)

router.post('/', workoutsCtrl.create)

export {
  router
}