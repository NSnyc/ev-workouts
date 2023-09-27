import { Exercise } from "../models/exercise.js"

function index(req, res) {
  Exercise.find({})
  .then(exercises => {
    res.render('exercises', {
      exercises,
      time: req.time,
      title: 'Exercises'
    })
  })
  .catch(error => { 
    console.log(error)
    res.redirect('/')
  })
}

function newExercise(req, res) {
  res.render('exercises/new', {
    title: 'Add Exercise'
  })
}

function create(req, res) {
  console.log(req.body)
  req.body.done = false
  Exercise.create(req.body)
  .then(exercise => {
    res.redirect('/exercises')
  })
  .catch(error => {
    console.log(error)
    res.redirect('/exercises')
  })
}

export {
  index,
  newExercise as new,
  create,
  
}