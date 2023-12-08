import mongoose from 'mongoose'

const PlanSdSchema = new mongoose.Schema({
  dateStr: String,
  description: String,
  duration: Number,
})

const PlanSD = mongoose.models.PlanSD || mongoose.model('PlanSD', PlanSdSchema)
export default PlanSD
