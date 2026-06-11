import { useState } from "react";
import type { FormEvent } from "react";
import Header from "../components/Header";

function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    console.log("Register Form:", formData);

    // Phase 2
    // Backend API integration will be added after JWT setup.
  };

  return (
    <>
      <Header />

      <main className="register-page">
        <section className="register-container">
          <h2>Resident Registration</h2>

          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="fullName">Full Name</label>

              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                autoComplete="name"
                required
              />
            </div>

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
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPassword">
                Confirm Password
              </label>

              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                required
              />
            </div>

            <button type="submit">
              Create Account
            </button>
          </form>
        </section>
      </main>
    </>
  );
}

export default RegisterPage;