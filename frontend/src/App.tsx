import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ApplyPage from "./pages/ApplicationForm";
import TrackStatusPage from "./pages/TrackStatusPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import ResidentListPage from "./pages/ResidentListPage";

import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/apply" element={<ApplyPage />} />
      <Route
        path="/track-status"
        element={<TrackStatusPage />}
      />

      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/register"
        element={<RegisterPage />}
      />

      <Route element={<ProtectedRoute />}>
        <Route
          path="/dashboard"
          element={<DashboardPage />}
        />

        <Route
          path="/admin/dashboard"
          element={<AdminDashboardPage />}
        />

        <Route
          path="/admin/residents"
          element={<ResidentListPage />}
        />
      </Route>
    </Routes>
  );
}

export default App;