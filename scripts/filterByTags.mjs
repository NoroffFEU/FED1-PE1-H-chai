import { API_BLOG_POST } from "./constants.mjs";
import { getPost } from "./constants.mjs";
import { displayPosts } from "./displayFeed.mjs";
import { getCurrentPage, renderPagination, renderPostsForPage, setCurrentPage } from "./pagination.mjs";

const posts = await getPost(API_BLOG_POST);

export function displayAllTags() {
  const allTagsSet = new Set();

  for(let i = 0; i < posts.data.length; i++) {
    posts.data[i].tags.forEach(tag => allTagsSet.add(tag));
  }

  const allTags = Array.from(allTagsSet);

  for(let i = 0; i < posts.data.length; i++) {
    const tagListContainer = document.querySelector('.tags');
    const tagListItem = document.createElement('li');
    const tagListButton = document.createElement('button');
    tagListButton.classList.add('tag-button');
    tagListButton.textContent = allTags[i];

    tagListItem.appendChild(tagListButton);
    tagListContainer.append(tagListItem);
    
    tagListButton.addEventListener('click', displayFilteredPost);
  }
}

function displayFilteredPost(event) {
  const tag = event.target.textContent;
  const filteredPosts = posts.data.filter(post => post.tags.includes(tag));

  displayPosts(filteredPosts);
  setCurrentPage(1);
  let totalPages = Math.ceil(filteredPosts.length / 12);
  renderPagination(totalPages);
}

const resetFilter = document.querySelector('.reset');
resetFilter.addEventListener('click', () => {
  setCurrentPage(1);
  displayPosts(posts.data.slice(0, 12));
  renderPostsForPage(getCurrentPage());
  let totalPages = Math.ceil(posts.data.length / 12);
  renderPagination(totalPages);
})