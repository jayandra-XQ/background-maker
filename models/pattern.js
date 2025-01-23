import mongoose from 'mongoose';


const PatternSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  patternType: { type: String, required: true },
  primaryColor: { type: String, required: true },
  density: { type: Number, required: true },
  size: { type: Number, required: true },
})

const Pattern = mongoose.model('Pattern', PatternSchema);

export default Pattern;