<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Accueil from "./Accueil";
import Login from "./Login";
import Profile from "./ProfileCreation";
import ForgotPassword from "./ForgotPassword";
import VerifyCode from "./VerifyCode";
import ResetPassword from "./ResetPassword";

export default function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Accueil />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/profile" element={<Profile />} />

      </Routes>
    </Router>
  );
}

=======
 import React from "react";
import EspaceEnseignant from "./pages/EspaceEnseignant.jsx"; // path صحيح + extension
import "./styles/App.css";

function App() {
  return <EspaceEnseignant />;
}

export default App;
>>>>>>> origin/salima
