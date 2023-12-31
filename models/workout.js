import mongoose from "mongoose"

const Schema = mongoose.Schema

const workoutSchema = new Schema({
  name: {type: String, required: true},
  profile: {type: Schema.Types.ObjectId, ref: 'Profile'},
  exercises: [{type: Schema.Types.ObjectId, ref: 'Exercise'}],
  date: {type: Date, default: Date.now},
})

const Workout = mongoose.model('Workout', workoutSchema)

export {
  Workout
}