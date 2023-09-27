import { Router } from 'express'
import * as workoutsCtrl from '../controllers/workouts.js'

const router = Router()

router.get('/', workoutsCtrl.index)
router.get('/new', workoutsCtrl.new)
router.get("/history", workoutsCtrl.getWorkoutHistory)
router.get('/:workoutId', workoutsCtrl.show)
router.get('/:workoutId/start', workoutsCtrl.start)

router.post('/:workoutId/results', workoutsCtrl.saveResults)
router.post('/', workoutsCtrl.create)
router.post('/:workoutId/exercises', workoutsCtrl.addExercise)

router.delete('/:workoutId', workoutsCtrl.delete)
router.delete('/:workoutId/exercises/:exerciseId', workoutsCtrl.removeExercise)

export {
  router
}