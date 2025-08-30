const  mongoose = require('mongoose');

const ministrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  leader: String,
  image: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Ministry', ministrySchema);
