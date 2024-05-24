import { API_REGISTER_USER } from "./constants.mjs";

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

    if (!response.ok) {
      throw new Error(json.errors[0].message);
    }

    return json;
  } catch (error) {
    console.log(error);
    throw error;
  }
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
    await registerUser(API_REGISTER_USER, user);
    alert(`Registration successful!\nUsername: ${user.name}\nEmail: ${user.email}`);
    window.location.href = 'login.html';
  } catch (error) {
    alert(`${error.message}. Please try again.`);
  }
  
}

const registerButton = document.getElementById('register-button');
registerButton.addEventListener('click', collectFormData);