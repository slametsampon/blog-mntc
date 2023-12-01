import mongoose from 'mongoose'

const opexSchema = new mongoose.Schema({
  month: [{ type: String, require: true }],
  monthBudget: [{ type: Number, require: true }],
  monthActual: [{ type: Number, require: true }],
})

const Opex = mongoose.models.Opex || mongoose.model('Opex', opexSchema)
export default Opex
