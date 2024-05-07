import { API_BLOG_POST } from "./constants.mjs";

async function getPost (url) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const json = await response.json();
    console.log(json);

    return json;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return date.toLocaleDateString('en-GB', options);
}

function generateFeedHTML(post) {
  const postContainer = document.createElement('a');
  postContainer.classList.add('post-container');
  postContainer.id = post.id;

  const thumbnail = document.createElement('img');
  thumbnail.classList.add('thumbnail');
  thumbnail.src = post.media.url;
  thumbnail.alt = post.media.alt;

  const postDetail = document.createElement('div');
  postDetail.classList.add('post-detail');

  const tagList = document.createElement('ul');
  tagList.classList.add('tag-list');

  const tagsArray = post.tags;
  tagsArray.forEach(tag => {
    const tagItem = document.createElement('li');
    tagItem.classList.add('tag-item');
    tagItem.textContent = tag;
    tagList.appendChild(tagItem);
  });

  const dateContainer = document.createElement('div');
  dateContainer.classList.add('date-container');
  
  const calendarIcon = document.createElement('i');
  calendarIcon.classList.add('fa-solid', 'fa-calendar-days', 'calendar-icon');

  const postDate = document.createElement('p');
  postDate.classList.add('post-date');
  postDate.textContent = formatDate(post.created);

  dateContainer.append(calendarIcon, postDate);
  
  postDetail.append(tagList, dateContainer);

  const postTitle = document.createElement('p');
  postTitle.classList.add('post-title');
  postTitle.textContent = post.title;

  postContainer.append(thumbnail, postDetail, postTitle);

  return postContainer;
}

function displayPosts(posts) {
  const postFeed = document.querySelector('.feed');
  postFeed.innerHTML = '';
  posts.forEach(post => {
    const postHTML = generateFeedHTML(post);
    postFeed.appendChild(postHTML);
  });
}

const posts = await getPost(API_BLOG_POST);
displayPosts(posts.data);