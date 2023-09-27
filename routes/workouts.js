import { Router } from 'express'
import * as workoutsCtrl from '../controllers/workouts.js'

const router = Router()

router.get('/', workoutsCtrl.index)

export {
  router
}