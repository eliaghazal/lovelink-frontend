import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import MatchPage from './MatchPage';

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData)); // ✅ Save user to localStorage
    setUser(userData);
  };
  

  const handleLogout = () => {
    localStorage.clear();  // Clears token + userId
    setUser(null);         // Goes back to login/signup
  };

  return (
    <div>
      {user ? (
        <>
          <MatchPage user={user} onLogout={handleLogout} />
        </>
      ) : isLogin ? (
        <>
          <Login onLogin={handleLogin} />
          <p style={{ textAlign: 'center' }}>
            Don’t have an account?{' '}
            <button onClick={() => setIsLogin(false)}>Sign Up</button>
          </p>
        </>
      ) : (
        <>
          <Signup onSignup={handleLogin} />
          <p style={{ textAlign: 'center' }}>
            Already have an account?{' '}
            <button onClick={() => setIsLogin(true)}>Log In</button>
          </p>
        </>
      )}
    </div>
  );
}

export default App;
