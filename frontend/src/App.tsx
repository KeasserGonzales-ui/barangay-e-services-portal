import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ApplyPage from "./pages/ApplyPage";
import TrackStatusPage from "./pages/TrackStatusPage";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/apply" element={<ApplyPage />} />
      <Route path="/track-status" element={<TrackStatusPage />} />
    </Routes>
  );
}

export default App;