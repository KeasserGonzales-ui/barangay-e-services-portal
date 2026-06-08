import Header from "../components/Header";

function RegisterPage() {
  return (
    <>
      <Header />

      <main>
        <h2>Resident Registration</h2>

        <form>
          <div>
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Create a password"
            />
          </div>

          <button type="submit">Register</button>
        </form>
      </main>
    </>
  );
}

export default RegisterPage;