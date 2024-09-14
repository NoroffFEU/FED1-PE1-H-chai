import { API_BLOG_POST } from "./constants.mjs";

let accessToken;

async function updateBlog(url, data) {
  try {
    accessToken = localStorage.getItem('accessToken');
    const postData = {
      method: 'PUT',
      headers: {
"X-Noroff-API-Key": "0af14e10-9129-4f49-bc74-e4611114ff9c",
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

export async function updatePostContent(event) {
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

  const updatedBlogPost = {
    title: title,
    tags: tagsArray,
    body: content,
    media: {
      url: imageUrl,
      alt: imageAlt,
    }
  }

  const url = new URL(window.location.href);
  const params = url.searchParams;
  const postId = params.get('id');
  const API_SINGLE_POST = `${API_BLOG_POST}/${postId}`;

  try {
    await updateBlog(API_SINGLE_POST, updatedBlogPost);
    alert('Blog post was successfully updated!');
    window.location.href = `singlePost.html?id=${postId}`;
  } catch (error) {
    console.error(error);
    alert('Something went wrong. Please try again.')
  }
}

