export function getPostId() {
  const postContainers = document.querySelectorAll('.post-container');
  postContainers.forEach(postContainer => {
    postContainer.addEventListener('click', () => {
      const postId = postContainer.getAttribute('id');
    });
  })
}

getPostId();