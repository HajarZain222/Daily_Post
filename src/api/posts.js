// const BASE_URL = "http://localhost:3001/posts";
const BASE_URL = "https://6a083f8afa9b27c848fac8be.mockapi.io/api";

const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
};

/**
 * Handle API errors and throw with meaningful messages
 * @param {Response} response - Fetch response object
 * @throws {Error} With detailed error message
 */
async function handleResponse(response) {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(
      error.message || `HTTP ${response.status}: ${response.statusText}`
    );
  }
  return response.json();
}

/**
 * Fetch all posts from json-server
 * @returns {Promise<Array>} Array of post objects
 * @throws {Error} If fetch fails
 */
export async function getPosts() {
  try {
    const response = await fetch(`${BASE_URL}/posts`);
    return await handleResponse(response);
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}

/**
 * Create a new post
 * @param {Object} post - Post object with title, description, image, author, authorId
 * @returns {Promise<Object>} Created post with id
 * @throws {Error} If creation fails
 */
export async function createPost(post) {
  try {
    const response = await fetch(`${BASE_URL}/posts`, {
      method: "POST",
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(post),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}

/**
 * Update an existing post (partial update)
 * @param {number|string} id - Post ID
 * @param {Object} updatedPost - Object with fields to update
 * @returns {Promise<Object>} Updated post object
 * @throws {Error} If update fails
 */
export async function updatePost(id, updatedPost) {
  try {
    const response = await fetch(`${BASE_URL}/posts/${id}`, {
      method: "PUT",
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(updatedPost),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error(`Error updating post ${id}:`, error);
    throw error;
  }
}

/**
 * Delete a post by ID
 * @param {number|string} id - Post ID to delete
 * @returns {Promise<void>}
 * @throws {Error} If deletion fails
 */
export async function deletePost(id) {
  try {
    const response = await fetch(`${BASE_URL}/posts/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: Failed to delete post`);
    }
  } catch (error) {
    console.error(`Error deleting post ${id}:`, error);
    throw error;
  }
}