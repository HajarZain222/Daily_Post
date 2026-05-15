import { PAGES } from "../constants/seedPosts";

export default function Navbar({ setPage, user, onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={() => setPage(PAGES.HOME)}>
        Daily<span>Post</span>
      </div>
      <div className="navbar-actions">
        {user ? (
          <>
            <span className="nav-greeting">
              Hi, <strong>{user.name}</strong>
            </span>
            <button className="btn-logout" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <span className="nav-link" onClick={() => setPage(PAGES.AUTH)}>
            Login / Register
          </span>
        )}
      </div>
    </nav>
  );
}
