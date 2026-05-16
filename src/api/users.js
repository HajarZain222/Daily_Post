// const BASE_URL = "http://localhost:3001/users";
const BASE_URL = "https://6a083f8afa9b27c848fac8be.mockapi.io/api";

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
    const existing = await fetch(`${BASE_URL}/users?email=${email}`);
    const data = await existing.json();

    if (data.length > 0) {
      throw new Error("Email already registered");
    }

    const response = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: DEFAULT_HEADERS,
      body: JSON.stringify({ name, email, password }),
    });
    return handleResponse(response);
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
      `${BASE_URL}/users?email=${email}&password=${password}`
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
    const response = await fetch(`${BASE_URL}/users`);
    return await handleResponse(response);
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}