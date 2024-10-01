const mongoose = require('mongoose');
const { Schema, model } = mongoose 
const appointmentSchema = new mongoose.Schema({
  patient:String,
  doctor: String,  
  startTime: Date,
  endTime: Date,
  procedure:String,
});
const Appointment = model('Appointment', appointmentSchema);

module.exports = Appointment;
