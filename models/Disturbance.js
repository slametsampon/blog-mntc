import mongoose from 'mongoose'

const disturbanceSchema = new mongoose.Schema({
  dateStr: String,
  description: String,
  duration: Number,
})

const Disturbance = mongoose.models.Disturbance || mongoose.model('Disturbance', disturbanceSchema)
export default Disturbance
