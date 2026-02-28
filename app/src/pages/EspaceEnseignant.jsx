 // src/pages/EspaceEnseignant.jsx
import React from "react";
  import Sidebar from "../components/Sidebar.jsx";
import CardOption from "../components/CardOption.jsx";
import "../styles/App.css";

const menu = [
  { name: "Cours", icon: "📚" },
  { name: "Live Video", icon: "🎥" },
  { name: "Profil", icon: "👤" },
  { name: "Examen", icon: "📝" },
];

export default function EspaceEnseignant() {
  return (
    <div className="ee-container">
      <Sidebar menu={menu} />
      <main className="ee-main">
        <h1>Espace Enseignant</h1>
        <div className="ee-grid">
          {menu.map((opt) => (
            <CardOption key={opt.name} icon={opt.icon} name={opt.name} />
          ))}
        </div>
      </main>
    </div>
  );
}