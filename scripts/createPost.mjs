import { API_BLOG_POST } from "./constants.mjs";

let accessToken;

async function postBlog (url, data) {
  try {
    accessToken = localStorage.getItem('accessToken');
    const postData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, postData);
    const json = await response.json();

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return json;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

async function createNewPost(event) {
  event.preventDefault();

  const titleInput = document.getElementById('title');
  const imageInput = document.getElementById('img-url');
  const imageAltInput = document.getElementById('img-alt');
  const tagsInput = document.getElementById('tags')
  const contentInput = document.getElementById('content');

  let title = titleInput.value;
  let imageUrl = imageInput.value;
  let imageAlt = imageAltInput.value;
  let tags = tagsInput.value;
  let tagsArray = tags.split(',');
  tagsArray = tagsArray.map(tag => tag.trim());
  let content = contentInput.value;

  titleInput.value = '';
  imageInput.value = '';
  imageAltInput.value = '';
  tagsInput.value = '';
  contentInput.value = '';

  const blogPost = {
    title: title,
    tags: tagsArray,
    body: content,
    media: {
      url: imageUrl,
      alt: imageAlt,
    }
  }

  try {
    await postBlog(API_BLOG_POST, blogPost);
    alert('New post was successfully posted!')
    window.location.href = 'index.html';
  } catch (error) {
    console.error(error);
    alert('Something went wrong. Please try again.');
  }
}

const postButton = document.getElementById('create-button');
postButton.addEventListener('click', createNewPost);

accessToken = localStorage.getItem('accessToken');
