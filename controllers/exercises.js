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

function show(req, res) {
  Exercise.findById(req.params.exerciseId)
  .then(exercise => {
    res.render('exercises/show', {
      exercise,
      title: 'Exercise Details'
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/exercises')
  })
}

function deleteExercise(req, res) {
  Exercise.findByIdAndDelete(req.params.exerciseId)
  .then(exercise => {
    res.redirect('/exercises')
  })
  .catch(error => {
    console.log(error)
    res.redirect('/exercises')
  })
}

function edit(req, res) {
  Exercise.findById(req.params.exerciseId)
  .then(exercise => {
    res.render('exercises/edit', {
      exercise,
      title: 'Edit Exercise'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/exercises')
  })
}

function update(req, res) {
  Exercise.findByIdAndUpdate(req.params.exerciseId, req.body, {new: true})
  .then(exercise => {
    res.redirect(`/exercises/${exercise._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/exercises')
  })
}

export {
  index,
  newExercise as new,
  create,
  show,
  deleteExercise as delete,
  edit,
  update,

}