import { generateFeedHTML } from "./displayFeed.mjs";

export function displayLatestPosts(posts) {
  const carouselContainer = document.querySelector('.latest');
  carouselContainer.innerHTML = '';
  posts.forEach(post => {
    const postHTML = generateFeedHTML(post);
    carouselContainer.appendChild(postHTML);
  });
}

export function displayLatestSinglePost(index) {
  const latestPosts = document.querySelectorAll('.latest .post-container');
  latestPosts.forEach((post, i) => {
    if (i === index) {
      post.style.display = 'block';
    } else {
      post.style.display = 'none';
    }
  });
}

let currentPostIndex = 0;

const previousButton = document.querySelector('.previous-button');
previousButton.addEventListener('click', () => {
  currentPostIndex = (currentPostIndex - 1 + 3) % 3;
  displayLatestSinglePost(currentPostIndex);
});

const nextButton = document.querySelector('.next-button');
nextButton.addEventListener('click', () => {
  currentPostIndex = (currentPostIndex + 1) % 3;
  displayLatestSinglePost(currentPostIndex);
});