import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Import the CSS file for styling

function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role for signup

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isSignup ? 'http://localhost:5000/api/signup' : 'http://localhost:5000/api/login';
    const data = isSignup ? { email, password, role } : { email, password };

    try {
      const response = await axios.post(url, data);
      if (!isSignup) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.userId); // Store user ID
        if (response.data.role === 'admin') {
          window.location.href = '/admin';
        } else {
          window.location.href = '/user';
        }
      } else {
        alert('Signup successful! Please log in.');
        setIsSignup(false);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        {isSignup && (
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        )}
        <button type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>
        <p onClick={() => setIsSignup(!isSignup)} className="toggle-link">
          {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
        </p>
      </form>
    </div>
  );
}

export default Login; 