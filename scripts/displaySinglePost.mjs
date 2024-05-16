import { API_BLOG_POST } from "./constants.mjs";
import { getPost } from "./constants.mjs";
import { formatDate } from "./formatDate.mjs";

// extract the post ID from the URL's query string
let url = new URL(window.location.href);
let params = url.searchParams;
let postId = params.get('id');

//const posts = await getPost(API_BLOG_POST);
const API_SINGLE_POST = `${API_BLOG_POST}/${postId}`;

function generateSinglePostHTML(post) {
  const singlePostContainer = document.createElement('article');
  singlePostContainer.classList.add('single-article');
  
  const title = document.createElement('h1');
  title.classList.add('title');
  title.textContent = post.title;
  
  const thumbnail = document.createElement('img');
  thumbnail.classList.add('thumbnail');
  thumbnail.src = post.media.url;
  thumbnail.alt = post.media.alt;
  
  const authorDate = document.createElement('div');
  authorDate.classList.add('author-date');
  const author = document.createElement('p');
  author.classList.add('author');
  author.textContent = post.author.name;
  const date = document.createElement('p');
  date.classList.add('date');
  date.textContent = formatDate(post.created);
  authorDate.append(author, date);
  
  const content = document.createElement('p')
  content.classList.add('content');
  content.textContent = post.body;
  
  singlePostContainer.append(title, thumbnail, authorDate, content);
  
  return singlePostContainer;
}

function displaySinglePost(post) {
  const articleContainer = document.querySelector('.article-container');
  articleContainer.innerHTML = '';
  const articleHTML = generateSinglePostHTML(post);
  articleContainer.appendChild(articleHTML);
}

const singlePost = await getPost(API_SINGLE_POST);
displaySinglePost(singlePost.data);
