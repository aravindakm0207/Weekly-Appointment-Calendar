import {
    FETCH_APPOINTMENTS,
    ADD_APPOINTMENT,
    UPDATE_APPOINTMENT,
    DELETE_APPOINTMENT,
  } from '../actions/appointmentActions';
  
  const initialState = {
    appointments: [],
  };
  
  const appointmentReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_APPOINTMENTS:
        return { ...state, appointments: action.payload };
      case ADD_APPOINTMENT:
        return { ...state, appointments: [...state.appointments, action.payload] };
      case UPDATE_APPOINTMENT:
        return {
          ...state,
          appointments: state.appointments.map((appt) =>
            appt._id === action.payload._id ? action.payload : appt
          ),
        };
      case DELETE_APPOINTMENT:
        return {
          ...state,
          appointments: state.appointments.filter((appt) => appt._id !== action.payload),
        };
      default:
        return state;
    }
  };
  
  export default appointmentReducer;
  