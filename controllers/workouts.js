import { Workout } from "../models/workout.js"

function index(req, res) {
  Promise.all([
    Workout.find({})
  .then(([workouts]) => {
    res.render('workouts/index', {
      workouts,
      title: 'All Workouts'
    });
  })
  .catch(err => {
    console.log(err)
    res.redirect('/workouts/new')
  })
  ])
}

function newWorkout(req, res) {
  Promise.all([
    Workout.find({}),
  ])
  .then(([workouts]) => {
    res.render('workouts/new', {
      title: 'Add Workout',
      workouts,
    });
  })
  .catch(err => {
    console.log(err);
    res.redirect('/workouts');
  });
}

export {
  index,
  newWorkout as new,
}