import { API_BLOG_POST } from "./constants.mjs";
import { getPost } from "./constants.mjs";
import { formatDate } from "./formatDate.mjs";

// extract the post ID from the URL's query string
const url = new URL(window.location.href);
const params = url.searchParams;
const postId = params.get('id');

// URL of single post page (with its id)
const API_SINGLE_POST = `${API_BLOG_POST}/${postId}`;

function generateSinglePostHTML(post) {
  const singlePostContainer = document.createElement('article');
  singlePostContainer.classList.add('single-article');
  
  const title = document.createElement('h1');
  title.classList.add('title');
  title.textContent = post.title;
  
  const thumbnail = document.createElement('img');
  thumbnail.classList.add('single-thumbnail');
  thumbnail.src = post.media.url;
  thumbnail.alt = post.media.alt;
  
  const authorDate = document.createElement('div');
  authorDate.classList.add('author-date');

  const authorDetail = document.createElement('div');
  authorDetail.classList.add('author-detail');
  const authorIcon = document.createElement('i');
  authorIcon.classList.add('fa-solid', 'fa-pen', 'author-icon');
  const author = document.createElement('p');
  author.classList.add('author');
  author.textContent = post.author.name;
  authorDetail.append(authorIcon, author);

  const dateDetail = document.createElement('div');
  dateDetail.classList.add('date-detail');
  const calendarIcon = document.createElement('i');
  calendarIcon.classList.add('fa-solid', 'fa-calendar-days', 'calendar-icon');
  const date = document.createElement('p');
  date.classList.add('date');
  date.textContent = formatDate(post.created);
  dateDetail.append(calendarIcon, date)

  authorDate.append(authorDetail, dateDetail);
  
  const content = document.createElement('p')
  content.classList.add('content');
  content.textContent = post.body;
  
  singlePostContainer.append(title, thumbnail, authorDate, content);
  
  return singlePostContainer;
}

export function displaySinglePost(post) {
  const articleContainer = document.querySelector('.article-container');
  articleContainer.innerHTML = '';
  const articleHTML = generateSinglePostHTML(post);
  articleContainer.appendChild(articleHTML);
}

const singlePost = await getPost(API_SINGLE_POST);
displaySinglePost(singlePost.data);

