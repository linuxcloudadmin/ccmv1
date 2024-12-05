import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './LoginPage.css';
import validator from "validator";

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
      setEmailMessage('Valid Email');
    } else {
      setEmailMessage('Enter valid Email!');
    }
  };

  const validateForm = (e) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.{6,})/;

    if (!validator.isEmail(email)) {
      setErrorMessage('Please enter a valid email');
      return;
    }

    // if (!passwordRegex.test(password)) {
    //   setErrorMessage('Please have 1 special character and min 6 chars');
    //   return;
    // }

    setErrorMessage('');
    alert('Login Successful!');
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
              <p className={`email-message ${emailMessage === 'Valid Email' ? 'valid' : 'invalid'}`}>
                {emailMessage}
              </p>
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