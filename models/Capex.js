import mongoose from 'mongoose'

const capexSchema = new mongoose.Schema({
  yearMonth: [{ type: String, require: true }], //format YYYY-MM
  monthBudget: [{ type: Number, require: true }],
  monthActual: [{ type: Number, require: true }],
})

const Capex = mongoose.models.Capex || mongoose.model('Capex', capexSchema)
export default Capex
