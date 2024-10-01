import React, { useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import { useSelector, useDispatch } from 'react-redux';
import {fetchAppointments,addAppointment,updateAppointment,deleteAppointment,} from '../redux/actions/appointmentActions';


const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar); 

const CustomEvent = ({ event }) => {
  return (
    <div>
      <div><strong>Patient:</strong> {event.patient}</div>
      <div><strong>Doctor:</strong> Dr. {event.doctor}</div>
      <div>{event.procedure}</div> 
    </div>
  );
};



const WeeklyCalendar = () => {
  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.appointment.appointments);

  
  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

 
  const handleSelectSlot = ({ start, end }) => {
    const now = new Date();
    
   
    if (start <= now) {
      alert("You cannot schedule an appointment in the past.");
      return;
    }

    const patientName = prompt('Enter Patient Name:');
    const doctorName = prompt('Enter Doctor Name:');
    const procedure = prompt('Enter Procedure (e.g., Root Canal, Check-Up):');

    
    if (patientName && doctorName && procedure) {
      dispatch(addAppointment({ patient: patientName, doctor: doctorName, startTime: start, endTime: end, procedure }));
    } else {
      alert("Please fill in all fields.");
    }
  };

  
  const handleEventDrop = ({ event, start, end }) => {
    dispatch(updateAppointment(event.id, { startTime: start, endTime: end }));
  };

 
  const handleSelectEvent = (event) => {
    if (window.confirm(`Are you sure you want to delete the appointment?`)) {
      dispatch(deleteAppointment(event.id));
    }
  };


  return (
    <div>
   <DnDCalendar
  localizer={localizer}
  events={appointments.map((appt) => ({
    title: '', 
    start: new Date(appt.startTime),
    end: new Date(appt.endTime),
    id: appt._id,
    patient: appt.patient, 
    doctor: appt.doctor,
    procedure:appt.procedure,
  }))}
  defaultView="week"
  style={{ height: 4000 }}
  selectable
  onSelectSlot={handleSelectSlot} 
  onSelectEvent={handleSelectEvent} 
  onEventDrop={handleEventDrop} 
  resizable
  components={{
    event: CustomEvent, 
  }}
/>

    </div>
  );
};

export default WeeklyCalendar;
