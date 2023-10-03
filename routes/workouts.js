import { Router } from 'express'
import * as workoutsCtrl from '../controllers/workouts.js'
import { isLoggedIn } from '../middleware/middleware.js'


const router = Router()

// router.get('/', workoutsCtrl.index)
router.get('/', workoutsCtrl.index)
router.get('/new', isLoggedIn, workoutsCtrl.new)
router.get("/history", isLoggedIn, workoutsCtrl.getWorkoutHistory)
router.get('/:workoutId', isLoggedIn, workoutsCtrl.show)
router.get('/:workoutId/start', workoutsCtrl.start)


router.post('/:workoutId/results', isLoggedIn, workoutsCtrl.saveResults)
router.post('/', isLoggedIn, workoutsCtrl.create)
router.post('/:workoutId/exercises', isLoggedIn, workoutsCtrl.addExercise)

router.delete('/:workoutId', isLoggedIn, workoutsCtrl.delete)
router.delete('/:workoutId/exercises/:exerciseId', isLoggedIn, workoutsCtrl.removeExercise)

export {
  router
}