import { API_BLOG_POST } from "./constants.mjs";
import { getPost } from "./constants.mjs";
import { renderPagination, renderPostsForPage, setCurrentPage } from "./pagination.mjs";

const posts = await getPost(API_BLOG_POST);

export let sortedPosts = [];

export function sortAsc() {
  sortedPosts = [...posts.data].sort((a, b) => new Date(a.created) - new Date(b.created));
  setCurrentPage(1);
  renderPostsForPage(1);
  let totalPages = Math.ceil(sortedPosts.length / 12);
  renderPagination(totalPages);
}

export function sortDesc() {
  sortedPosts = [...posts.data].sort((a, b) => new Date(b.created) - new Date(a.created));
  setCurrentPage(1);
  renderPostsForPage(1);
  let totalPages = Math.ceil(sortedPosts.length / 12);
  renderPagination(totalPages);
}

export function toggleActiveButton (button) {
  const sortBtn = document.querySelectorAll('.sort-button');
  sortBtn.forEach(btn => {
    btn.classList.remove('sort-active');
  });
  button.classList.add('sort-active');
}
