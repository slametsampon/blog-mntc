import mongoose from 'mongoose'

const opexSchema = new mongoose.Schema({
  yearMonth: [{ type: String, require: true }], //format YYYY-MM
  monthBudget: [{ type: Number, require: true }],
  monthActual: [{ type: Number, require: true }],
})

const Opex = mongoose.models.Opex || mongoose.model('Opex', opexSchema)
export default Opex
