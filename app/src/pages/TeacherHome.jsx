 import { useNavigate } from "react-router-dom";
import "../styles/App.css";

export default function TeacherHome() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <h2 className="logo">superprof</h2>
        <div className="auth-buttons">
          <button 
            className="connexion-btn" 
            onClick={() => navigate("/profile")}
          >
            <div className="avatar">A</div> {/* Profile Avatar */}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero">
        <h1>Trouvez le professeur parfait</h1>
        <div className="search-box">
          <input type="text" placeholder="Montage Vidéo" />
          <button className="search-btn">Rechercher</button>
        </div>
      </div>

      {/* Categories */}
      <div className="categories">
        <div>Anglais</div>
        <div>Maths</div>
        <div>Français</div>
        <div>Arabe</div>
        <div>Physique - Chimie</div>
        <div>Soutien scolaire</div>
        <div>Coaching Sportif</div>
      </div>
    </div>
  );
}