import { API_BLOG_POST } from "./constants.mjs";

let accessToken;

async function deleteBlog(url) {
  try {
    accessToken = localStorage.getItem('accessToken');
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

export async function deletePostContent(event) {
  event.preventDefault();

  const url = new URL(window.location.href);
  const params = url.searchParams;
  const postId = params.get('id');
  const API_SINGLE_POST = `${API_BLOG_POST}/${postId}`;

  try {
    await deleteBlog(API_SINGLE_POST);
    alert('The blog post was deleted!');
    window.location.href = 'index.html';
  } catch (error) {
    console.error(error);
    alert('Something went wrong. Please try again.');
  }
}