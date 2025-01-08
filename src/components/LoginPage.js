import React, { useState } from 'react';
import { data, useNavigate } from "react-router-dom";
import axios from 'axios';
import './LoginPage.css';
import validator from "validator";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { setUserName, fetchUsernameFromApi } from './userData';

export function getJwtToken() {
  return localStorage.getItem('jwtToken');
}

export function setJwtToken(token) {
  localStorage.setItem('jwtToken', token);
}

export function removeJwtToken() {
  localStorage.removeItem('jwtToken');
}

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [modalEmail, setModalEmail] = useState('');
  const [modalEmailError, setModalEmailError] = useState('');
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
      // const a="eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdWRoYXJzYW50Y21AZ21haWwuY29tIiwiZW1haWwiOiJzdWRoYXJzYW50Y21AZ21haWwuY29tIiwidXNlcm5hbWUiOiJzdWRoYXJzYW50Y20iLCJpYXQiOjE3MzU4OTkyNDAsImV4cCI6MTczNTkzNTI0MH0.2DXlspIS05lbcQmqHaOl8idbUxrwaL6KF-bwfx83f-_1a7rbemcAYwZN8X0nuSFmpguSsLnMJ2F7mMQjZJqfQg";
      // const response1 = await axios.get('/api1/api/customer/jwt/validate', {
      //   params: {
      //     token: a
      //   }
      // });
      // console.log(response1.data);
      const encodedPassword = btoa(password);
      const response = await axios.post('/api1/api/customer/login/subsequent', { email, password: encodedPassword, });
      // const { data } = await axios.post('/api1/api/customer/login/subsequent', { email, password: encodedPassword, });
      const { token, name, accountValidated, passwordExpired, message } = response.data;
      console.log(response.data);

      setUserName(name.first, name.last);
      console.log(name.first);
      console.log(name.last);
      alert();
      
      // Save the token to localStorage (or sessionStorage)
      // localStorage.setItem('jwtToken', token);
      setJwtToken(token);
      console.log(token);
      console.log(getJwtToken());



      if (!accountValidated) {      //remove "!" to login without validation
        fetchUsernameFromApi(token);
        setModalEmail(email);
        setShowVerificationModal(true);
        return;
      }

      if (passwordExpired) {
        setValidationMessage(
          'Your password has expired. Please reset your password to continue.'
        );
        navigate('/reset-password');
        return;
      }

      // const a="eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdWRoYXJzYW50Y21AZ21haWwuY29tIiwiZW1haWwiOiJzdWRoYXJzYW50Y21AZ21haWwuY29tIiwidXNlcm5hbWUiOiJzdWRoYXJzYW50Y20iLCJpYXQiOjE3MzU4OTkyNDAsImV4cCI6MTczNTkzNTI0MH0.2DXlspIS05lbcQmqHaOl8idbUxrwaL6KF-bwfx83f-_1a7rbemcAYwZN8X0nuSFmpguSsLnMJ2F7mMQjZJqfQg";
      // const response1 = await axios.get('/api1/api/customer/jwt/validate', {
      //   params: {
      //     token: token
      //   }
      // });
      // console.log(response1.data);

      fetchUsernameFromApi(token);
      setSuccessMessage(message);
      navigate('/dashboard');
      
    } catch (error) {
      const errorResponse = error.response?.data?.message || 'An error occurred during login.';
      setErrorMessage(errorResponse);
      alert(error.response.data.error);
    }
  };

  
  const handleSendVerification = async () => {
    if (!validator.isEmail(modalEmail)) {
      setModalEmailError('Please enter a valid email address.');
      return;
    }
    console.log ("hello1");
    try {
      const token=getJwtToken();
      console.log(token);
      console.log(modalEmail);
      const options = {
        method: 'POST',
        url: '/api1/api/customer/send-verification',
        headers: {
          Accept: '*/*',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        data: {email: 'sushan1151@gmail.com'}
      };

      const { data } = await axios(options);



  console.log(data);
      console.log(token);
      // console.log(response,response.data);
      console.log ("hello");
      alert('Verification email sent. Please check your inbox.');
      setShowVerificationModal(false);
    } catch (error) {
      console.error(error.response.data);
      alert(error.response.data.error);
      alert('Failed to send verification email. Please try again later.');
    }
  };

  const handleModalEmailChange = (e) => {
    setModalEmail(e.target.value);
    setModalEmailError('');
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

      {showVerificationModal && (
        <div className="verification-modal">
          <div className="modal-content">
            <h3>Your account is not validated.</h3>
            <p>Please verify your email to send verification link.</p>
            <div className="form-group">
              <label htmlFor="modal-email">Email:</label>
              <input
                type="email"
                id="modal-email"
                value={modalEmail}
                onChange={handleModalEmailChange}
              />
              {modalEmailError && <p className="error-message">{modalEmailError}</p>}
            </div>
            <button onClick={handleSendVerification} className="modal-button">
              Send Verification Email
            </button>
            <button
              onClick={() => setShowVerificationModal(false)}
              className="modal-close-button"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginPage;