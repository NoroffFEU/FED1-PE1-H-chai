import { displayPosts } from "./displayFeed.mjs";
import { API_BLOG_POST } from "./constants.mjs";
import { getPost } from "./constants.mjs";
import { sortedPosts } from "./sortDate.mjs";

let currentPage = 1;

export function getCurrentPage() {
  return currentPage;
}

export function setCurrentPage(page) {
  currentPage = page;
}

export function renderPagination(totalPages) {
  const pagination = document.querySelector('.pagination');
  pagination.innerHTML = '';

  for(let i = 1; i <= totalPages; i++) {
    const button = document.createElement('button');
    button.textContent = i;
    button.classList.add('page-button');

    button.addEventListener('click', () => {
      currentPage = i;
      renderPostsForPage(i);
      updateButtonClassName();
    });
    pagination.append(button);
  }

  updateButtonClassName();
}

const posts = await getPost(API_BLOG_POST);

export function renderPostsForPage(pageNumber) {
  const data = sortedPosts.length > 0 ? sortedPosts : posts.data;
  const startIndex = (pageNumber - 1) * 12;
  const endIndex = startIndex + 12;
  const postsForPage = data.slice(startIndex, endIndex);

  displayPosts(postsForPage);
}

function updateButtonClassName() {
  const buttons = document.querySelectorAll('.page-button');
  buttons.forEach((button) => {
    if (button.textContent === currentPage.toString()) {
      button.classList.add('current-page');
    } else {
      button.classList.remove('current-page');
    }
  })
}