import mongoose from "mongoose"

const workoutResultSchema = new mongoose.Schema({
  profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
  workout: { type: mongoose.Schema.Types.ObjectId, ref: 'Workout' },
  workoutName: String, // Add the workoutName field
  date: { type: Date, default: Date.now },
  exercises: [{
    exerciseName: String,
    results: [{
      date: Date,
      sets: [{
        reps: Number,
        weight: Number,
      }],
    }],
  }],
})




const WorkoutResult = mongoose.model('WorkoutResult', workoutResultSchema)

export {
  WorkoutResult
}