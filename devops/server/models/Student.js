const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date_of_birth: {
    type: Date,
    required: true
  },
  class_id: {
    type: Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  country_id: {
    type: Schema.Types.ObjectId,
    ref: 'Country',
    required: true
  }
}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
