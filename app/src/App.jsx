 import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TeacherHome from "./pages/TeacherHome";
import TeacherProfile from "./pages/TeacherProfile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TeacherHome />} />
        <Route path="/profile" element={<TeacherProfile />} />
      </Routes>
    </Router>
  );
}

export default App;