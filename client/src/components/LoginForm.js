import React from "react";

export default function LoginForm() {
  return (
    <div className="form-container">
      <form className="form">
        <label htmlFor="login">Username:</label>
        <input type="text" id="login" />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" />

        <button type="submit" className="button button--lift">
          Log in
        </button>
      </form>
      <p>Forgot password?</p>
    </div>
  );
}
