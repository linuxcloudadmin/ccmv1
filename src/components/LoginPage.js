import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const validateForm = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.{6,})/;

    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email');
      return;
    }

    if (!passwordRegex.test(password)) {
      setErrorMessage('Please have 1 special character and min 6 chars');
      return;
    }

    setErrorMessage('');
    alert('Login Successful!');
    navigate("/dashboard");
    // Proceed with login logic

    // if (username === "admin" && password === "password") {
    //     // On successful login, navigate to the dashboard
    //     navigate("/dashboard");
    //   } else {
    //     setError("Invalid username or password");
    //   }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form className="login-form" onSubmit={validateForm}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
