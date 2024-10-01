import { Routes, Route, Link } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Account from './components/Account';
import WeeklyCalendar from './components/Calendar';
import AppointmentSummary from './components/Summary';
import PrivateRoute from './components/PrivateRoute';
import { useAuth } from './context/AuthContext';

function App() {
  const { user, dispatch } = useAuth();

  const conditionalLinks = (path, roles, label) => {
    if (roles.includes(user?.account?.role)) {
      return <Link to={path}>{label}</Link>;
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      (async () => {
        try {
          const response = await axios.get('http://localhost:3333/users/account', {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          });
          dispatch({ type: 'LOGIN', payload: { account: response.data } });
        } catch (error) {
          console.error('Error fetching user account:', error);
        }
      })();
    }
  }, [dispatch]);

  return (
    <div>
      <h2>Dashboard</h2>
      <Link to="/">Home</Link> |

      {!user.isLoggedIn ? (
        <>
          <Link to="/register">Register</Link> |
          <Link to="/login">Login</Link> |
        </>
      ) : (
        <>
          <Link to="/account">Account</Link> |
          {conditionalLinks('/add-event', ['patient'], 'Add Appointment')} |
         {conditionalLinks('/calendar', [ 'doctor'], 'View Calendar')} |
          {conditionalLinks('/summary', ['doctor'], 'View Appointment Summary')} |
          <Link to="/" onClick={() => {
            localStorage.removeItem('token');
            dispatch({ type: 'LOGOUT' });
          }}>
            Logout
          </Link> |
        </>
      )}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={
          <PrivateRoute permittedRoles={['patient', 'doctor']}>
            <Account />
          </PrivateRoute>
        } />
        <Route path="/add-event" element={
          <PrivateRoute permittedRoles={['patient']}>
            <WeeklyCalendar />
          </PrivateRoute>
        } />
        <Route path="/calendar" element={
          <PrivateRoute permittedRoles={['patient', 'doctor']}>
            <WeeklyCalendar />
          </PrivateRoute>
        } />
        <Route path="/summary" element={
  <PrivateRoute permittedRoles={[ 'doctor']}>
    <AppointmentSummary />
  </PrivateRoute>
} />

      </Routes>
    </div>
  );
}

export default App;
