import { Workout } from "../models/workout.js"

function index(req, res) {
  Promise.all([
    Workout.find({}).populate('exercises'),
  ])
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
}

export {
  index,

}