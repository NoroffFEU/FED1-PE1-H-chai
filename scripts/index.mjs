/* import { API_REGISTER_USER } from "./constants.mjs"; */
//import { sendFormData } from "./register.mjs";
//import { sendLoginData } from "./login.mjs";

/* const user = {
  name: 'hikari',
  email: 'hikari-project-exam@stud.noroff.no',
  password: 'hikarifedaug23f',
} */

//sendFormData();
//sendLoginData();

import { displayLatestPosts } from "./carousel.mjs";
import { displayLatestSinglePost } from "./carousel.mjs";
import { API_BLOG_POST } from "./constants.mjs";
import { getPost } from "./constants.mjs";
import { getPostId } from "./getPostId.mjs";

const posts = await getPost(API_BLOG_POST);
const latestPosts = posts.data.slice(0, 3);
displayLatestPosts(latestPosts)
let currentPostIndex = 0;
displayLatestSinglePost(currentPostIndex);
getPostId();