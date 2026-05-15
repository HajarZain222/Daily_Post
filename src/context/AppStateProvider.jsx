import { createContext, useContext, useState, useEffect } from "react";
import { getPosts, createPost, updatePost, deletePost } from "../api/posts";
import { PAGES, TOAST_DURATION } from "../constants/seedPosts";

export const AppStateContext = createContext(null);

export function AppStateProvider({ children }) {
  // Navigation state
  const [page, setPage] = useState(PAGES.HOME);

  // Auth state
  const [user, setUser] = useState(null);

  // Posts state
  const [posts, setPosts] = useState([]);
  const [editPost, setEditPost] = useState(null);

  // Users state
  const [users, setUsers] = useState([]);

  // UI state
  const [toast, setToast] = useState("");
  const [confirm, setConfirm] = useState(null); // { post }

  /**
   * Load all posts from json-server
   */
  async function loadPosts() {
    try {
      const data = await getPosts();
      setPosts(data);
    } catch (error) {
      console.error("Failed to load posts:", error);
      showToast("Failed to load posts. Please refresh.");
    }
  }

  /**
   * Fetch posts from API on mount
   */
  useEffect(() => {
    loadPosts();
  }, []);


  /**
   * Show toast notification that auto-dismisses
   */
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), TOAST_DURATION);
  };

  /**
   * Handle user login
   */
  const handleLogin = (u) => {
    setUser(u);
    showToast(`Welcome back, ${u.name}! 👋`);
    setPage(PAGES.HOME);
  };

  /**
   * Handle user logout
   */
  const handleLogout = () => {
    setUser(null);
    setPage(PAGES.HOME);
    showToast("Logged out successfully.");
  };

  /**
   * Navigate to a specific page
   */
  const navigateToPage = (newPage) => {
    setPage(newPage);
  };

  /**
   * Handle post save (create or update)
   */
  const handleSavePost = async (post) => {
    try {
      let savedPost;
      if (editPost) {
        // Update existing post
        const updates = {
          title: post.title,
          description: post.description,
          image: post.image,
        };
        savedPost = await updatePost(post.id, updates);
        setPosts((prev) =>
          prev.map((p) => (p.id === post.id ? savedPost : p))
        );
        showToast("Post updated! ✅");
      } else {
        // Create new post
        savedPost = await createPost(post);
        setPosts((prev) => [savedPost, ...prev]);
        showToast("Post published! 🎉");
      }
      setEditPost(null);
      setPage(PAGES.HOME);
    } catch (error) {
      console.error("Failed to save post:", error);
      showToast("Failed to save post. Please try again.");
    }
  };

  /**
   * Request post deletion
   */
  const handleDeleteRequest = (post) => {
    setConfirm({ post });
  };

  /**
   * Confirm post deletion
   */
  const handleDeleteConfirm = async () => {
    try {
      const postId = confirm.post.id;
      await deletePost(postId);
      setPosts((prev) => prev.filter((p) => p.id !== postId));
      setConfirm(null);
      showToast("Post deleted.");
    } catch (error) {
      console.error("Failed to delete post:", error);
      showToast("Failed to delete post. Please try again.");
    }
  };

  /**
   * Cancel delete confirmation
   */
  const handleDeleteCancel = () => {
    setConfirm(null);
  };

  const value = {
    // Navigation
    page,
    setPage: navigateToPage,

    // Auth
    user,
    handleLogin,
    handleLogout,

    // Posts
    posts,
    editPost,
    setEditPost,
    handleSavePost,
    handleDeleteRequest,
    handleDeleteConfirm,
    handleDeleteCancel,

    // Users
    users,
    setUsers,

    // UI
    toast,
    confirm,
    showToast,
  };

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

/**
 * Hook to use AppStateContext
 * @returns {object} Context value
 */
export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within AppStateProvider");
  }
  return context;
}
