import { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
    const [serverErrors, setServerErrors] = useState([]);
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        role: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => ({ ...prevForm, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3333/users/register", form);
            navigate('/login'); 
        } catch (err) {
            console.log(err);
            setServerErrors(err.response?.data?.errors || []);
        }
    };

    return (
        <div>
            <h1>Register</h1>
            {serverErrors.length > 0 && (
                <div>
                    {serverErrors.map((ele, i) => (
                        <div key={i} style={{ color: 'red' }}>**{ele.msg}</div>
                    ))}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <br/>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                    />
                </div>
               
                <div>
                    <label htmlFor="email">Email</label>
                    <br/>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <br/>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Role: </label>
                    <div>
                        <input
                            type="radio"
                            id="patient"
                            name="role"
                            value="patient"
                            checked={form.role === "patient"}
                            onChange={handleChange}
                        />
                        <label htmlFor="patient">Patient</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="doctor"
                            name="role"
                            value="doctor"
                            checked={form.role === "doctor"}
                            onChange={handleChange}
                        />
                        <label htmlFor="doctor">Doctor</label>
                    </div>
                </div>

                <button type="submit">Submit</button>
                <div>
                    <Link to='/loginPage'>Already have an account? Login here</Link>
                </div>
            </form>
        </div>
    );
}
