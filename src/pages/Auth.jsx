import { useState } from "react";
import { generateId } from "../utils/helpers";
import { PAGES, AUTH_TABS } from "../constants/seedPosts";
import { useAppState } from "../context/AppStateProvider";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, loginSchema } from "../validation/authSchema";

export default function AuthPage() {
  const [tab, setTab] = useState(AUTH_TABS.LOGIN);

  const { users, setUsers, showToast, handleLogin, setPage } = useAppState();

  // switch schema based on tab
  const schema = tab === AUTH_TABS.REGISTER ? registerSchema : loginSchema;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    if (tab === AUTH_TABS.REGISTER) {
      const newUser = {
        id: generateId(),
        ...data,
      };

      setUsers((prev) => [...prev, newUser]);
      handleLogin(newUser);
    } else {
      const found = users.find(
        (u) => u.email === data.email && u.password === data.password
      );

      if (!found) {
        showToast("Invalid email or password 🔓");
        return;
      }

      handleLogin(found);
    }

    setPage(PAGES.HOME);
    reset();
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card-header">
          <h2>
            {tab === AUTH_TABS.LOGIN ? "Welcome back" : "Join DailyPost"}
          </h2>
          <p>
            {tab === AUTH_TABS.LOGIN
              ? "Sign in to your account"
              : "Create your account and start writing"}
          </p>
        </div>

        {/* Tabs */}
        <div className="auth-tabs">
          <button
            className={`auth-tab ${tab === AUTH_TABS.LOGIN ? "active" : ""}`}
            onClick={() => setTab(AUTH_TABS.LOGIN)}
          >
            Login
          </button>

          <button
            className={`auth-tab ${tab === AUTH_TABS.REGISTER ? "active" : ""}`}
            onClick={() => setTab(AUTH_TABS.REGISTER)}
          >
            Register
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name (only register) */}
          {tab === AUTH_TABS.REGISTER && (
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                className="form-input"
                placeholder="Your name"
                {...register("name")}
              />
              {errors.name && (
                <div className="form-error">{errors.name.message}</div>
              )}
            </div>
          )}

          {/* Email */}
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="email"
              placeholder="you@example.com"
              {...register("email")}
            />
            {errors.email && (
              <div className="form-error">{errors.email.message}</div>
            )}
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              placeholder="••••••••"
              {...register("password")}
            />
            {errors.password && (
              <div className="form-error">{errors.password.message}</div>
            )}
          </div>

          <button className="btn-primary" type="submit">
            {tab === AUTH_TABS.LOGIN ? "Sign In" : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}