import mongoose from "mongoose"

const Schema = mongoose.Schema 

const exerciseSchema = new Schema({
  text: String,
  category: {
    type: String,
    enum: ['Cardio', 'Body Weight', 'Weights']
  },
  muscleGroup: {
    type: String,
    enum: ['Chest', 'Back', 'Legs', 'Arms', 'Shoulders', 'Core', 'Full Body']
  },
  sets: Number,
})

// Compile the schema into a model and export it
const Exercise = mongoose.model('Exercise', exerciseSchema)

export {
  Exercise,
}