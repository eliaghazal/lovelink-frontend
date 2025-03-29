import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [questionnaire, setQuestionnaire] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async () => {
    if (!name || !email || !password || !questionnaire) {
      setMessage("❌ All fields are required.");
      return;
    }
  
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage("❌ Invalid email format.");
      return;
    }
  
    // Password validation: min 6 chars
    if (password.length < 6) {
      setMessage("❌ Password must be at least 6 characters.");
      return;
    }
  
    // Questionnaire validation: at least 3 items
    const interests = questionnaire.split(',').map(item => item.trim());
    if (interests.length < 3) {
      setMessage("❌ Please enter at least 3 interests.");
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:5000/api/users/signup', {
        name,
        email,
        password,
        questionnaire: interests
      });
      setMessage("✅ Signed up! You’re officially in LoveLink 💘");
    } catch (err) {
      setMessage("❌ Signup failed. Try another email.");
    }
  };
  

  return (
    <div style={{ maxWidth: 400, margin: '50px auto', fontFamily: 'sans-serif' }}>
      <h2>LoveLink 💘 Sign Up</h2>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <br /><br />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <br /><br />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <br /><br />
      <input placeholder="3 Interests (comma separated)" value={questionnaire} onChange={e => setQuestionnaire(e.target.value)} />
      <br /><br />
      <button onClick={handleSignup}>Sign Up</button>
      <p>{message}</p>
    </div>
  );
}

export default App;
