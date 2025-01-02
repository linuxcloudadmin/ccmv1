import axios from 'axios';

export let userName = { first: '', last: '' };

export const setUserName = (first, last) => {
  userName = { first, last };
};


// Import axios (if using in a Node.js environment, install axios via npm: npm install axios)
// In browsers, include axios via a script tag or your bundler.


// Declare oneusername outside the function
export let oneusername = null;

// Function to send JWT token to an API and extract the username
export async function fetchUsernameFromApi(savedtoken) {
  try {
    // const apiUrl = '/api1/api/customer/jwt/validate';
    // Retrieve the JWT token from localStorage
    const token = savedtoken;

    if (!token) {
      throw new Error('No JWT token found in localStorage.');
    }

    // Send the token to the API
    const response = await axios.get('/api1/api/customer/jwt/validate', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    // Assign the retrieved username to the exported variable
    oneusername = response.data.username;

    console.log('Username retrieved:', oneusername);

    return oneusername;
  } catch (error) {
    console.error('Error fetching username:', error.message);
  }
}

// Usage
// const apiEndpoint = 'https://example.com/api/endpoint'; // Replace with your API URL

