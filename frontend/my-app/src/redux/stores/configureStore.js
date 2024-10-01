import { createStore, combineReducers, applyMiddleware} from 'redux'
import { thunk } from 'redux-thunk'
import appointmentReducer from '../reducers/appointmentReducer'


const configureStore = () => { 
    const store = createStore(combineReducers({
      appointment:appointmentReducer, 
        
    }), applyMiddleware(thunk))
    return store 
}

export default configureStore