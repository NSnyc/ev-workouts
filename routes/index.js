import express from 'express'
import * as workoutsCtrl from '../controllers/workouts.js'

const router = express.Router()

// Home page route
router.get("/", (req, res) => {
  workoutsCtrl.getWorkoutHistory(req)
  .then((workoutHistory) => {
    res.render("index", { title: "Home Page", workoutHistory })
  })
  .catch((err) => {
    console.error(err)
    res.status(500).send("Internal Server Error")
  })
})

export {router}