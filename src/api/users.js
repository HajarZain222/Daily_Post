const BASE_URL = "http://localhost:3001/users";

const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
};

/**
 * Handle API response errors
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
 * Register new user
 */
export async function registerUser(name, email, password) {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: DEFAULT_HEADERS,
      body: JSON.stringify({ name, email, password }),
    });

    return await handleResponse(response);
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
}

/**
 * Login user
 */
export async function loginUser(email, password) {
  try {
    const response = await fetch(
      `${BASE_URL}?email=${email}&password=${password}`
    );

    const data = await handleResponse(response);

    return data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}

/**
 * Get all users (optional - useful for admin/debug)
 */
export async function getUsers() {
  try {
    const response = await fetch(BASE_URL);
    return await handleResponse(response);
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}