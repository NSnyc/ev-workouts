import { Exercise } from "../models/exercise.js"
import { Workout } from "../models/workout.js"

function index(req, res) {
  Promise.all([
    Workout.find({}).populate('exercises'),
    Exercise.find({})
  ])
  .then(([workouts, exercises]) => {
    res.render('workouts/index', {
      workouts,
      exercises,
      title: 'All Workouts'
    })
  })
  .catch(err => {
    console.log(err);
    res.redirect('/workouts/new')
  })
}

function newWorkout(req, res) {
  Promise.all([
    Workout.find({}),
    Exercise.find({})
  ])
  .then(([workouts, exercises]) => {
    res.render('workouts/new', {
      title: 'Add Workout',
      workouts,
      exercises
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/workouts')
  })
}

function create(req, res) {
  if (!req.user) {
    return res.redirect('/login')
  }
  const exerciseIds = Array.isArray(req.body.exerciseIds) ? req.body.exerciseIds : [req.body.exerciseIds];
  const workoutData = {
    name: req.body.name,
    user: req.user._id,
    exercises: exerciseIds,
    date: Date.now(),
  }
  Workout.create(workoutData)
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
  .populate('exercises')
  .then(workout => {
    console.log(workout)
    Exercise.find({_id: {$nin: workout.exercises}})
    .then(exercise => {
      res.render('workouts/show', {
        workout,
        title: 'Workout Detail',
        
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/workouts')
    })
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

function addExercise(req, res) {
  Workout.findById(req.params.workoutId)
    .then(workout => {
      if (workout.exercises.includes(req.body.exerciseId)) {
        res.redirect('/workouts')
      } else {
        workout.exercises.push(req.body.exerciseId)
        return workout.save()
          .then(() => {
            res.redirect('/workouts')
          })
      }
    })
    .catch(err => {
      console.log(err)
      res.redirect('/workouts')
    })
}

function removeExercise(req, res) {
  Workout.findById(req.params.workoutId)
    .then(workout => {
      workout.exercises.pull(req.params.exerciseId)
      return workout.save()
    })
    .then(() => {
      res.redirect('/workouts')
    })
    .catch(err => {
      console.log(err)
      res.redirect('/workouts')
    })
}

function start(req, res) {
  Workout.findById(req.params.workoutId).populate('exercises')
    .then(workout => {
      res.render('workouts/start', {
        workout: workout,
        title: "Today's Workout",
      })
    })
    .catch(err => {
      console.error(err)
      res.redirect('/workouts')
    })
}

function saveResults(req, res) {
  if (!req.user) {
    return res.redirect('/login')
  }
  Workout.findById(req.params.workoutId).populate('exercises')
  .then(workout => {
    const promises = []
    workout.exercises.forEach(exercise => {
      const results = {
        date: new Date(),
        sets: [],
        user: req.user._id // Save the user's ID with the results
      }
      for (let i = 1; i <= exercise.sets; i++) {
        results.sets.push({
          reps: req.body[`${exercise._id}-set-${i}-reps`],
          weight: req.body[`${exercise._id}-set-${i}-weight`]
        })
      }
      exercise.results.push(results)
      promises.push(exercise.save())
    })
    return Promise.all(promises);
  })
  .then(() => {
    res.redirect('/workouts');
  })
  .catch(err => {
    console.error(err)
    res.redirect('/workouts')
  })
}

export {
  index,
  newWorkout as new,
  create,
  show,
  deleteWorkout as delete,
  addExercise,
  removeExercise,
  start,
}