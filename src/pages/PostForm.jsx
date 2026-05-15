import { useState } from "react";
import { PAGES } from "../constants/seedPosts";
import { useAppState } from "../context/AppStateProvider";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema } from "../validation/postSchema";

export default function PostFormPage() {
  const { user, editPost, setEditPost, handleSavePost, setPage } =
    useAppState();

  const isEdit = !!editPost;
  const [imgOk, setImgOk] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: editPost?.title || "",
      description: editPost?.description || "",
      image: editPost?.image || "",
    },
  });

  const watch = useWatch({ control });

  const onSubmit = async (data) => {
    const post = isEdit
      ? {
          id: editPost.id,
          ...editPost,
          ...data,
        }
      : {
          ...data,
          author: user.name,
          authorId: user.id,
        };

    await handleSavePost(post);
    reset();
  };

  const handleCancel = () => {
    setEditPost(null);
    setPage(PAGES.HOME);
    reset();
  };

  return (
    <div className="post-form-page">
      <div className="post-form-container">
        <div className="post-form-header">
          <h2>{isEdit ? "Edit Post" : "New Post"}</h2>
          <p>{isEdit ? "Update your article details." : "Share your thoughts."}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="post-form">
          {/* TITLE */}
          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              className="form-input"
              placeholder="Your post title"
              {...register("title")}
              autoFocus
            />
            {errors.title && (
              <span className="form-error">{errors.title.message}</span>
            )}
          </div>

          {/* DESCRIPTION */}
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-textarea"
              placeholder="Write your post content here..."
              rows={6}
              {...register("description")}
            />
            {errors.description && (
              <span className="form-error">{errors.description.message}</span>
            )}
          </div>

          {/* IMAGE */}
          <div className="form-group">
            <label className="form-label">Image URL (optional)</label>
            <input
              className="form-input"
              placeholder="https://example.com/image.jpg"
              {...register("image")}
              onChange={() => setImgOk(true)}
            />
            {errors.image && (
              <span className="form-error">{errors.image.message}</span>
            )}

            {/* Image Preview */}
            {imgOk && watch?.image && (
              <div className="image-preview-container">
                <img
                  src={watch.image}
                  alt="Preview"
                  className="image-preview"
                  onError={() => setImgOk(false)}
                />
              </div>
            )}
          </div>

          {/* ACTIONS */}
          <div className="form-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>

            <button
              className="btn-primary"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? isEdit
                  ? "Saving..."
                  : "Publishing..."
                : isEdit
                  ? "Save Changes"
                  : "Publish Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}