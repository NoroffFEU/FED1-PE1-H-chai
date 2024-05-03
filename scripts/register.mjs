import { API_REGISTER_USER } from "./constants.mjs";

// takes two parameters: 'url' (URL of the API endpoint) and 'data' (the data to be sent in the request)
async function registerUser(url, data) {
  try {
    const postData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, postData);
    const json = await response.json();

    console.log('Response:', response); // Log the entire response object
    console.log('JSON:', json); // Log the parsed JSON data

    if (!response.ok) {
      // If the response status is not OK, throw an error with the response message
      throw new Error(json.errors[0].message);
    }

    return json;
  } catch (error) {
    console.log(error);
    throw error; // Re-throw the error to handle it in the calling code
  }
}

export function sendFormData() {
  const registerButton = document.getElementById('register-button');
  registerButton.addEventListener('click', collectFormData);
}

async function collectFormData (event) {
  event.preventDefault();

  const usernameInput = document.getElementById('username');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  let username = usernameInput.value;
  let email = emailInput.value;
  let password = passwordInput.value;

  usernameInput.value = '';
  emailInput.value = '';
  passwordInput.value = '';

  const user = {
    name: username,
    email: email,
    password: password
  }

  try {
    const response = await registerUser(API_REGISTER_USER, user);
    console.log(response);
    alert('Registration successful!');
    username = '';
  } catch (error) {
    alert(`${error.message}. Please try again.`);
  }
  
}