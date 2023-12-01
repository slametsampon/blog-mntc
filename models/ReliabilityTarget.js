import mongoose from 'mongoose'

const reliabilityYaerSchema = new mongoose.Schema({
  year: Number,
  day: Number,
  schSdDay: Number,
  uschSdDay: Number,
  operationDay: Number,
  operationTargetHour: Number,
  operationActualHour: Number,
})

const ReliabilityYear =
  mongoose.models.ReliabilityYear || mongoose.model('ReliabilityYear', reliabilityYaerSchema)
export default ReliabilityYear
