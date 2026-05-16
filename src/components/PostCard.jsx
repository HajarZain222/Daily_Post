import { useState } from "react";

export default function PostCard({ post, user, onEdit, onDelete }) {
  // const isOwner = user && user.id === post.authorId;
  const isOwner = user && String(user.id) === String(post.authorId);
  const [imgError, setImgError] = useState(false);

  return (
    <article className="post-card">
      {post.image && !imgError ? (
        <img
          src={post.image}
          alt={post.title}
          className="post-card-image"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="post-card-image-placeholder"></div>
      )}
      <div className="post-card-body">
        <div className="post-card-meta">
          Author: <span className="post-card-meta-span">{post.author}</span>
        </div>
        <h2 className="post-card-title">{post.title}</h2>
        <p className="post-card-desc">{post.description}</p>
      </div>
      {isOwner && (
        <div className="post-card-actions">
          <button className="btn-edit" onClick={() => onEdit(post)}>
            Edit
          </button>
          <button className="btn-remove" onClick={() => onDelete(post)}>
            Remove
          </button>
        </div>
      )}
    </article>
  );
}
