import { useAppState } from "../context/AppStateProvider";
import { PAGES } from "../constants/seedPosts";
import Navbar from "../components/Navbar";
import Toast from "../components/Toast";
import ConfirmDialog from "../components/ConfirmDialog";
import HomePage from "../pages/Home";
import AuthPage from "../pages/Auth";
import PostFormPage from "../pages/PostForm";
import Footer from "../components/Footer";

export default function Layout() {
  const {
    page,
    user,
    posts,
    toast,
    confirm,
    setPage,
    setEditPost,
    handleLogout,
    handleDeleteRequest,
    handleDeleteConfirm,
    handleDeleteCancel,
  } = useAppState();

  return (
    <div className="app-layout">
      {/* Header */}
      <Navbar
        setPage={setPage}
        user={user}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <main className="app-main">
        {page === PAGES.HOME && (
          <HomePage
            posts={posts}
            user={user}
            setPage={setPage}
            setEditPost={setEditPost}
            onDeleteRequest={handleDeleteRequest}
          />
        )}

        {page === PAGES.AUTH && <AuthPage />}

        {page === PAGES.POST_FORM && user && <PostFormPage />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Global UI Elements */}
      {toast && <Toast message={toast} key={toast} />}

      {confirm && (
        <ConfirmDialog
          message={`"${confirm.post.title}" will be permanently deleted.`}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </div>
  );
}
