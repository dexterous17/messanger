import React, { useState } from 'react';
import api from '../api/api';
import '../css/login.css';
import { useNavigate } from 'react-router-dom';

function Login({ socket }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log(socket.connected)
      const response = await api.post('/login', { email, password });
      const token = response.data.token;
      console.log(token)
      localStorage.setItem('jwtToken', token);
      console.log('Login successful!');
      // Redirect to the profile page or perform any other actions
      socket.connect()
      console.log(socket.connected)
      navigate('/');
    } catch (error) {
      console.log('Login failed:', error);
    }
  };

  return (
    <div className='Login'>
      <h1>Login</h1>
      <div></div>
      <form className='Login-main' onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>
        <br />
        <label>
          <div>Password:</div>
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>
        <br />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default Login;
