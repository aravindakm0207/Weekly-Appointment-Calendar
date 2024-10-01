const Appointment = require('../models/appointment-model');
const { validationResult } = require('express-validator')
const appointmentCltr={}


appointmentCltr.createAppointment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Validation errors:', errors.array()); 
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Error creating appointment', error });
  }
};



appointmentCltr.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments', error });
  }
};


appointmentCltr.updateAppointment = async (req, res) => {
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(500).json({ message: 'Error updating appointment', error });
  }
};


appointmentCltr.deleteAppointment = async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Appointment deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting appointment', error });
  }
};


module.exports = appointmentCltr 