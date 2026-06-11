import { useState } from "react";
import type { FormEvent } from "react";
import Header from "../components/Header";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("Login Form:", formData);

    // Phase 2
    // JWT authentication API integration will be added
    // after the backend authentication endpoints are created.
  };

  return (
    <>
      <Header />

      <main className="login-page">
        <section className="login-container">
          <h2>Resident Login</h2>

          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email Address</label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </div>

            <div>
              <label htmlFor="password">Password</label>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
              />
            </div>

            <button type="submit">
              Login
            </button>
          </form>
        </section>
      </main>
    </>
  );
}

export default LoginPage;