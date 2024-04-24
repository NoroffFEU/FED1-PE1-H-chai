import { API_REGISTER_USER } from "./constants.mjs";
import { registerUser } from "./register.mjs";

const user = {
  name: 'hikari_fedaug23f',
  email: 'hikari-account@noroff.no',
  password: 'hikari12345',
}

registerUser(API_REGISTER_USER, user);