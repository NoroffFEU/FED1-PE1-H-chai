import { API_BLOG_POST } from "./constants.mjs";
import { getPost } from "./constants.mjs";
import { displayPosts } from "./displayFeed.mjs";
import { renderPagination } from "./pagination.mjs";

const posts = await getPost(API_BLOG_POST);
displayPosts(posts.data.slice(0, 12));
let totalPages = Math.ceil(posts.data.length / 12);
renderPagination(totalPages);