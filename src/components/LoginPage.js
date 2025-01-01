import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './LoginPage.css';
import validator from "validator";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { setUserName } from './userData';


function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
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

  const validateForm = async (e) => {
    e.preventDefault();

    if (!validator.isEmail(email)) {
      setErrorMessage('Please enter a valid email.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    try {
      // endpoint for login
      const response = await axios.post('/api1/api/customer/login/subsequent', {email,password,});

      const { token, name, accountValidated, passwordExpired, message } = response.data;

      setUserName(name.first, name.last);
      console.log(name.first);
      console.log(name.last);
      alert();
      // Save the token to localStorage (or sessionStorage)
      localStorage.setItem('jwtToken', token);

      if (accountValidated) {
        setValidationMessage(
          'Your account is not validated. Please check your email to verify your account.'
        );
        return;
      }

      if (passwordExpired) {
        setValidationMessage(
          'Your password has expired. Please reset your password to continue.'
        );
        navigate('/reset-password'); // Redirect to password reset page
        return;
      }

      // If everything is fine, show the welcome message and navigate to the dashboard
      setSuccessMessage(message);
      navigate('/dashboard');
    } catch (error) {
      // Handle errors
      const errorResponse =
        error.response?.data?.message || 'An error occurred during login.';
      setErrorMessage(errorResponse);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        {validationMessage && <p className="validation-message">{validationMessage}</p>}
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