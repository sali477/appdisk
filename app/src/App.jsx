import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Accueil from "./Accueil";
import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";
import VerifyCode from "./VerifyCode";
import ResetPassword from "./ResetPassword";
import StudentDashboard from "./StudentDashboard";
import ProfessorProfile from "./ProfessorProfile";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/professor/:id" element={<ProfessorProfile />} />
      </Routes>
    </Router>
  );
}