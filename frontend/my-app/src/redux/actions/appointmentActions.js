import axios from 'axios';


export const FETCH_APPOINTMENTS = 'FETCH_APPOINTMENTS';
export const ADD_APPOINTMENT = 'ADD_APPOINTMENT';
export const UPDATE_APPOINTMENT = 'UPDATE_APPOINTMENT';
export const DELETE_APPOINTMENT = 'DELETE_APPOINTMENT';


export const fetchAppointments = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const { data } = await axios.get('http://localhost:3333/appointments', {
      headers: {
        Authorization: token
      },
    });
    dispatch({ type: FETCH_APPOINTMENTS, payload: data });
    console.log('Fetched appointments:', data);
  } catch (error) {
    console.error('Error fetching appointments', error);
  }
};



export const addAppointment = (appointment) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token'); 
    console.log('Adding appointment:', appointment); 
    const { data } = await axios.post('http://localhost:3333/appointments', appointment, {
      headers: {
        Authorization: token // Add token to headers
      },
    });
    dispatch({ type: ADD_APPOINTMENT, payload: data });
  } catch (error) {
    console.error('Error adding appointment', error);
  }
};



export const updateAppointment = (id, updatedDetails) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token'); 
    const { data } = await axios.put(`http://localhost:3333/appointments/${id}`, updatedDetails, {
      headers: {
        Authorization: token 
      },
    });
    dispatch({ type: UPDATE_APPOINTMENT, payload: data });
  } catch (error) {
    console.error('Error updating appointment', error);
  }
};


export const deleteAppointment = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token'); 
    await axios.delete(`http://localhost:3333/appointments/${id}`, {
      headers: {
        Authorization: token 
      },
    });
    dispatch({ type: DELETE_APPOINTMENT, payload: id });
  } catch (error) {
    console.error('Error deleting appointment', error);
  }
};
