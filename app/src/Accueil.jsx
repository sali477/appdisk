import React, { useState } from "react";
import { Link } from "react-router-dom";   // ⭐ مهم لفتح login
import "./Accueil.css";

export default function Accueil() {
  const [search, setSearch] = useState("");

  const modules = ["Analyse", "Algèbre", "Physique", "Informatique", "Chimie", "Biologie"];
  const professeurs = [
    { name: "Dr. Ali", photo: "https://randomuser.me/api/portraits/men/11.jpg", speciality: "Mathématiques" },
    { name: "Dr. Omar", photo: "https://randomuser.me/api/portraits/men/12.jpg", speciality: "Informatique" },
    { name: "Dr. Karim", photo: "https://randomuser.me/api/portraits/men/13.jpg", speciality: "Physique" }
  ];

  const filteredModules = modules.filter(mod => mod.toLowerCase().includes(search.toLowerCase()));
  const filteredProfs = professeurs.filter(prof =>
    prof.name.toLowerCase().includes(search.toLowerCase()) ||
    prof.speciality.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="accueil">

      {/* HEADER */}
      <header className="header">
        <div className="header-container">
          <h1>MYPROF</h1>

          <nav>
            <a href="#">Accueil</a>
            <a href="#modules">Modules</a>
            <a href="#professeurs">Professeurs</a>
            <a href="#contact">Contact</a>
          </nav>

          {/* 🔥 زر Connexion الآن يمشي لـ Login.jsx */}
          <Link to="/login">
            <button>Connexion</button>
          </Link>

        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div>
          <h2>Bienvenue à MYPROF</h2>
          <p>Explorez votre faculté et découvrez nos enseignants à travers une interface intuitive.</p>

          <div className="hero-search">
            <input 
              type="text" 
              placeholder="Rechercher un module ou professeur..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
            />
            <button>Rechercher</button>
          </div>
        </div>
      </section>

      {/* MODULES */}
      <section className="modules" id="modules">
        <h3>Modules Universitaires</h3>
        <div className="modules-grid">
          {filteredModules.length > 0 ? filteredModules.map((mod, index) => (
            <div key={index} className="module-card">
              <h4>{mod}</h4>
              <p>Accédez aux cours, TD, TP et ressources pour {mod}.</p>
            </div>
          )) : <p>Aucun module trouvé</p>}
        </div>
      </section>

      {/* PROFESSEURS */}
      <section className="professeurs" id="professeurs">
        <h3>Nos Enseignants</h3>
        <div className="prof-grid">
          {filteredProfs.length > 0 ? filteredProfs.map((prof, index) => (
            <div key={index} className="prof-card">
              <img src={prof.photo} alt={prof.name} />
              <h4>{prof.name}</h4>
              <p>{prof.speciality}</p>
              <div className="prof-buttons">
                <button>Contacter</button>
                <button>Voir CV</button>
              </div>
            </div>
          )) : <p>Aucun professeur trouvé</p>}
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <p>© 2026 MYPROF. Tous droits réservés.</p>
      </footer>

    </div>
  );
}
