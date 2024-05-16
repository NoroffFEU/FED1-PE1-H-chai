/* const user = {
  name: 'hikari',
  email: 'hikari-project-exam@stud.noroff.no',
  password: 'hikarifedaug23f',
} */

import { displayLatestPosts } from "./carousel.mjs";
import { displayLatestSinglePost } from "./carousel.mjs";
import { API_BLOG_POST } from "./constants.mjs";
import { getPost } from "./constants.mjs";
import { getPostId } from "./getPostId.mjs";
import { displayPosts } from "./displayFeed.mjs";
import { renderPagination } from "./pagination.mjs";

const posts = await getPost(API_BLOG_POST);
const latestPosts = posts.data.slice(0, 3);
displayLatestPosts(latestPosts)
let currentPostIndex = 0;
displayLatestSinglePost(currentPostIndex);
getPostId();
displayPosts(posts.data.slice(0, 12));
let totalPages = Math.ceil(posts.data.length / 12);
renderPagination(totalPages);