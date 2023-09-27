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

export {
  index,
}