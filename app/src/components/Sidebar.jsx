// src/components/Sidebar.jsx
import React from "react";
import "../styles/App.css"; // ✅ go up one folder from components -> src -> styles

export default function Sidebar({ menu }) {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Espace Enseignant</h2>
      <ul>
        {menu.map((item) => (
          <li key={item.name} className="sidebar-item">
            {item.icon} {item.name}
          </li>
        ))}
      </ul>
    </aside>
  );
}