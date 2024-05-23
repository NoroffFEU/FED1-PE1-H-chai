import { API_BLOG_POST } from "./constants.mjs";
import { getPost } from "./constants.mjs";
import { deletePostContent } from "./deletePost.mjs";
import { updatePostContent } from "./updatePost.mjs";

// extract the post ID from the URL's query string
const url = new URL(window.location.href);
const params = url.searchParams;
const postId = params.get('id');

const API_SINGLE_POST = `${API_BLOG_POST}/${postId}`;
const singlePost = await getPost(API_SINGLE_POST);

function insertPostDetail() {
  const title = document.getElementById('title');
  title.value = singlePost.data.title;

  const thumbnail = document.getElementById('img-url');
  thumbnail.value = singlePost.data.media.url;

  const thumbnailAlt = document.getElementById('img-alt');
  thumbnailAlt.value = singlePost.data.media.alt;

  const tags = document.getElementById('tags');
  const tagsArray = singlePost.data.tags;
  tags.value = tagsArray.join(', ');

  const content = document.getElementById('content');
  content.value = singlePost.data.body;
}

insertPostDetail();

const updateButton = document.getElementById('update-button');
updateButton.addEventListener('click', updatePostContent);

const deleteButton = document.getElementById('delete-button');
deleteButton.addEventListener('click', deletePostContent);


