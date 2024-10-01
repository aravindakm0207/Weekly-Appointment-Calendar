import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAppointments } from '../redux/actions/appointmentActions';

const AppointmentSummary = () => {
  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.appointment.appointments);

  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  console.log(appointments);

  return (
    <div>
      <h2>Upcoming Appointments</h2>
      <ul>
        {appointments.map((appt) => (
          <li key={appt._id}>
            <strong>{appt.patient}</strong> Appointment with Doctor <strong>{appt.doctor}</strong>
            <br />
            Procedure: <strong>{appt.procedure}</strong> 
            <br />
            From: {new Date(appt.startTime).toLocaleString()} To: {new Date(appt.endTime).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentSummary;
