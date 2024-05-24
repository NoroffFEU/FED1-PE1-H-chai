import { API_BLOG_POST } from "./constants.mjs";
import { getPost } from "./constants.mjs";
import { displaySinglePost } from "./displaySinglePost.mjs";

const url = new URL(window.location.href);
const params = url.searchParams;
const postId = params.get('id');

const posts = await getPost(API_BLOG_POST);
let currentIndex = posts.data.findIndex(post => post.id === postId);

const previousBtn = document.querySelector('.previous-post');
const previousPostTitleContainer = document.querySelector('.previous-post-title');
if (currentIndex <= 0) {
  previousBtn.disabled = true;
  previousBtn.style.cursor = 'not-allowed';
  previousPostTitleContainer.textContent = '';
} else {
  previousBtn.disabled = false;
  previousBtn.style.cursor = 'pointer';
  previousPostTitleContainer.textContent = posts.data[currentIndex - 1].title;
}

if (currentIndex > 0) {
  previousBtn.addEventListener('click', async () => {
    const previousIndex = currentIndex - 1;
    if (previousIndex >= 0) {
      const previousPostId = posts.data[previousIndex].id;
      const API_PREVIOUS_POST = `${API_BLOG_POST}/${previousPostId}`;
      const previousPost = await getPost(API_PREVIOUS_POST);
      displaySinglePost(previousPost.data);
      const fullURL = window.location.href;
      const myRepoName = fullURL.split('/')[3];
      window.location.href = `${window.location.origin}/${myRepoName}/post/singlePost.html?id=${previousPostId}`;
      currentIndex = previousIndex;

      if (currentIndex <= 0) {
        previousBtn.disabled = true;
        previousBtn.style.cursor = 'not-allowed';
        previousPostTitleContainer.textContent = '';
      } else {
        previousPostTitleContainer.textContent = posts.data[currentIndex - 1].title;
      }

      console.log(currentIndex);
    }
  })
}


const nextBtn = document.querySelector('.next-post');
const nextPostTitleContainer = document.querySelector('.next-post-title');
if (currentIndex >= posts.data.length - 1) {
  nextBtn.disabled = true;
  nextBtn.style.cursor = 'not-allowed';
  nextPostTitleContainer.textContent = '';
} else {
  nextBtn.disabled = false;
  nextBtn.style.cursor = 'pointer';
  nextPostTitleContainer.textContent = posts.data[currentIndex + 1].title;
}

if (currentIndex < posts.data.length - 1) {
  nextBtn.addEventListener('click', async () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex <= posts.data.length -1) {
      const nextPostId = posts.data[nextIndex].id;
      const API_NEXT_POST = `${API_BLOG_POST}/${nextPostId}`;
      const nextPost = await getPost(API_NEXT_POST);
      displaySinglePost(nextPost.data);
      const fullURL = window.location.href;
      const myRepoName = fullURL.split('/')[3];
      window.location.href = `${window.location.origin}/${myRepoName}/post/singlePost.html?id=${nextPostId}`;
      currentIndex = nextIndex;

      if (currentIndex >= posts.data.length - 1) {
        nextBtn.disabled = true;
        nextBtn.style.cursor = 'not-allowed';
        nextPostTitleContainer.textContent = '';
      } else {
        nextPostTitleContainer.textContent = posts.data[currentIndex + 1].title;
      }

      console.log(currentIndex);
    }
  })
}
