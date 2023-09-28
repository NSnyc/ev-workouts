import express from 'express'
import * as workoutsCtrl from '../controllers/workouts.js'

const router = express.Router()

// Home page route
router.get("/", (req, res) => {
  // Retrieve workout history using the controller function
  workoutsCtrl.getWorkoutHistory(req)
    .then((workoutHistory) => {
      // Render the 'index' view with the workoutHistory data
      res.render("index", { title: "Home Page", workoutHistory })
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send("Internal Server Error")
    })
})

export {router}