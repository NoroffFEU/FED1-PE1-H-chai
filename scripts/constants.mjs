const API_BASE_URL = "https://v2.api.noroff.dev/";

export const API_REGISTER_USER = `${API_BASE_URL}auth/register`;
export const API_BLOG_POST = `${API_BASE_URL}blog/posts/hikari`;
export const API_LOGIN = `${API_BASE_URL}auth/login`;

export async function getPost (url) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        "X-Noroff-API-Key": "0af14e10-9129-4f49-bc74-e4611114ff9c",
        'Content-Type': 'application/json'
      }
    });
    const json = await response.json();
    
    return json;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
