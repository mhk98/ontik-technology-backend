const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const drawingSchema = new Schema({
  title: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  elements: [
    {
      type: { type: String, enum: ['line', 'rectangle', 'circle', 'text'], required: true },
      data: Schema.Types.Mixed
    }
  ]
});

module.exports = mongoose.model('Drawing', drawingSchema);
