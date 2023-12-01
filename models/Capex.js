import mongoose from 'mongoose'

const capexSchema = new mongoose.Schema({
  month: [{ type: String, require: true }],
  monthBudget: [{ type: Number, require: true }],
  monthActual: [{ type: Number, require: true }],
})

const Capex = mongoose.models.Capex || mongoose.model('Capex', capexSchema)
export default Capex
