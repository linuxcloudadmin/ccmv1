import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './LoginPage.css';
import validator from "validator";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    if (inputEmail === '') {
      setEmailMessage('');
    } else if (validator.isEmail(inputEmail)) {
      setEmailMessage('valid');
    } else {
      setEmailMessage('invalid');
    }
  };

  const validateForm = (e) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.{6,})/;

    if (!validator.isEmail(email)) {
      setErrorMessage('Please enter a valid email');
      return;
    }

    setErrorMessage('');
    //alert('Login Successful!');
    navigate("/dashboard");
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
              onChange={handleEmailChange}
            />
            {emailMessage && (
              <div className="email-status">
                {emailMessage === 'valid' ? (
                  <CheckCircleIcon sx={{ color: 'green', fontSize: 24 }} />
                ) : emailMessage === 'invalid' ? (
                  <CancelIcon sx={{ color: 'red', fontSize: 24 }} />
                ) : null}
              </div>
            )}
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