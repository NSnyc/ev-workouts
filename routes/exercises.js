import { Router } from 'express'
import * as exercisesCtrl from '../controllers/exercises.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

// GET localhost:3000/exercises
router.get('/', exercisesCtrl.index)
router.get('/new', isLoggedIn, exercisesCtrl.new)
router.get('/:exerciseId', exercisesCtrl.show)
router.get('/:exerciseId/edit', exercisesCtrl.edit)

router.post('/', isLoggedIn, exercisesCtrl.create)

router.delete('/:exerciseId', exercisesCtrl.delete)
router.put('/:exerciseId', exercisesCtrl.update)

export { router }