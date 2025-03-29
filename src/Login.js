import React, { useState } from 'react';
import axios from 'axios';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage("❌ Please enter email and password.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password
      });

      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('userId', user._id);
      onLogin(user);
    } catch (err) {
      setMessage("❌ Login failed. Check your credentials.");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '50px auto', fontFamily: 'sans-serif' }}>
      <h2>LoveLink 💘 Login</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <br /><br />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <br /><br />
      <button onClick={handleLogin}>Log In</button>
      <p>{message}</p>
    </div>
  );
}

export default Login;
