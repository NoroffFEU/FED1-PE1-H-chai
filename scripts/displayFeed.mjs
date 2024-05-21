import { formatDate } from "./formatDate.mjs";

export function generateFeedHTML(post) {
  const postContainer = document.createElement('a');
  postContainer.classList.add('post-container');
  postContainer.id = post.id;
  postContainer.href = `post/singlePost.html?id=${postContainer.id}`;

  const figure = document.createElement('figure');
  const thumbnail = document.createElement('img');
  thumbnail.classList.add('thumbnail');
  thumbnail.src = post.media.url;
  thumbnail.alt = post.media.alt;
  figure.appendChild(thumbnail);

  const postTextContainer = document.createElement('div');
  postTextContainer.classList.add('post-text-container');

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

  postTextContainer.append(postDetail, postTitle);

  postContainer.append(figure, postTextContainer);

  return postContainer;
}

export function displayPosts(posts) {
  const postFeed = document.querySelector('.feed');
  postFeed.innerHTML = '';
  posts.forEach(post => {
    const postHTML = generateFeedHTML(post);
    postFeed.appendChild(postHTML);
  });
}