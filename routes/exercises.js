import { Router } from 'express'
import * as exercisesCtrl from '../controllers/exercises.js'

const router = Router()

// GET localhost:3000/exercises
router.get('/', exercisesCtrl.index)
router.get('/new', exercisesCtrl.new)

export { router }