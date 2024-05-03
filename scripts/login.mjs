import { API_LOGIN } from "./constants.mjs";

async function loginUser(url, data) {
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

    if (response.ok) {
      const accessToken = json.data.accessToken;
      localStorage.setItem('accessToken', accessToken);
      console.log(json);
      console.log(accessToken);
      window.location.href = '../post/index.html';
    } else {
      throw new Error(json.error);
    }
    
    return json;
  } catch (error) {
    console.log(error);
    throw error
  }
}

export function sendLoginData() {
  const loginButton = document.getElementById('login-button');
  loginButton.addEventListener('click', collectUserData);
}

async function collectUserData(event) {
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
    await loginUser(API_LOGIN, user);
  } catch (error) {
    alert('Login failed. Please try again.');
  }
}