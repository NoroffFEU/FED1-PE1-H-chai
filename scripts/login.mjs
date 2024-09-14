import { API_LOGIN } from "./constants.mjs";

let accessToken;

async function loginUser(url, data) {
  try {
    const postData = {
      method: 'POST',
      headers: {
"X-Noroff-API-Key": "0af14e10-9129-4f49-bc74-e4611114ff9c",
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, postData);
    const json = await response.json();

    if (response.ok) {
      accessToken = json.data.accessToken;
      localStorage.setItem('accessToken', accessToken);
      window.location.href = '../post/index.html';
    } else {
      throw new Error(json.error);
    }
    
    return json;
  } catch (error) {
    console.log(error);
    throw error;
  }
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
    alert(error.message);
  }
}

const loginButton = document.getElementById('login-button');
loginButton.addEventListener('click', collectUserData);