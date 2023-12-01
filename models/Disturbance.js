import mongoose from 'mongoose'

const disturbanceSchema = new mongoose.Schema({
  date: Date,
  description: String,
  duration: Number,
})

const Disturbance = mongoose.models.Disturbance || mongoose.model('Disturbance', disturbanceSchema)
export default Disturbance
