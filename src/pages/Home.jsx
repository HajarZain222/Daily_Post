import PostCard from "../components/PostCard";
import { PAGES } from "../constants/seedPosts";

export default function HomePage({
  posts,
  user,
  setPage,
  setEditPost,
  onDeleteRequest,
}) {
  const isEmpty = posts.length === 0;

  const handleEdit = (post) => {
    setEditPost(post);
    setPage(PAGES.POST_FORM);
  };

  const handleCreatePost = () => {
    setEditPost(null);
    setPage(PAGES.POST_FORM);
  };

  return (
    <>
      {/* HERO */}
      <div className="hero">
        <p className="hero-label">✦ Welcome to DailyPost</p>
        <h1>
          Share something <br /> new <em>every day</em>
        </h1>
        <p>Daily posts from developers, thinkers, and creators.</p>
      </div>

      {/* POSTS */}
      <div className="container">
        <div className="section-label">
          Latest Posts — {posts.length} article{posts.length !== 1 ? "s" : ""}
        </div>

        {isEmpty ? (
          <div className="empty-state">
            <div className="empty-state-icon"></div>
            <h3>No posts yet</h3>
            <p>
              {user
                ? "Be the first to share something! Use the + button below."
                : "Log in to share your first post."}
            </p>
          </div>
        ) : (
          <div className="posts-grid">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                user={user}
                onEdit={handleEdit}
                onDelete={onDeleteRequest}
              />
            ))}
          </div>
        )}
      </div>

      {/* FAB */}
      {user && (
        <button
          className="fab"
          title="Add new post"
          onClick={handleCreatePost}
        >
          +
        </button>
      )}
    </>
  );
}