import Header from "../components/Header";

function LoginPage() {
  return (
    <>
      <Header />

      <main>
        <h2>Resident Login</h2>

        <form>
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
              placeholder="Enter your password"
            />
          </div>

          <button type="submit">Login</button>
        </form>
      </main>
    </>
  );
}

export default LoginPage;