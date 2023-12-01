import mongoose from 'mongoose'

const reliabilitySchema = new mongoose.Schema({
  month: [{ type: String, require: true }],
  monthDay: [{ type: Number, require: true }],
  monthTargetDay: [{ type: Number, require: true }],
  monthTargetHrs: [{ type: Number, require: true }],
  monthActualHrs: [{ type: Number, require: true }],
})

const Reliability = mongoose.models.Reliability || mongoose.model('Reliability', reliabilitySchema)
export default Reliability
