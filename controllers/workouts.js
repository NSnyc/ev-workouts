import { Workout } from "../models/workout.js"

function index(req, res) {
  Workout.find({})
    .then(workouts => {
      res.render('workouts/index', {
        workouts,
        title: 'All Workouts'
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/workouts/new')
    })
}

function newWorkout(req, res) {
  Promise.all([
    Workout.find({}),
  ])
  .then(([workouts]) => {
    res.render('workouts/new', {
      title: 'Add Workout',
      workouts,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/workouts')
  })
}

function create(req, res) {
    Workout.create(req.body)
  .then(workout => {
    res.redirect('/workouts/new')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/workouts')
  })
}

function show(req, res) {
  Workout.findById(req.params.workoutId)
  .then(workout => {
    res.render('workouts/show', {
      workout,
      title: 'Workout Details'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/workouts')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/workouts')
  })
}

function deleteWorkout(req, res) {
  Workout.findByIdAndDelete(req.params.workoutId)
    .then(() => {
      res.redirect('/workouts')
    })
    .catch(err => {
      console.log(err)
      res.redirect('/workouts')
    })
}

export {
  index,
  newWorkout as new,
  create,
  show,
  deleteWorkout as delete,

}