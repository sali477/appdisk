 import React from "react";

const menu = [
  { name: "Cours", icon: "📚" },
  { name: "Live Video", icon: "🎥" },
  { name: "Profil", icon: "👤" },
  { name: "Examen", icon: "📝" },
];

function Sidebar({ menu }) {
  return (
    <div
      style={{
        width: 220,
        backgroundColor: "#1e3a8a",
        color: "#fff",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 15,
        height: "100vh",
        boxSizing: "border-box",
      }}
    >
      <h2 style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
        Menu
      </h2>
      {menu.map((item) => (
        <button
          key={item.name}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: 10,
            borderRadius: 8,
            backgroundColor: "transparent",
            border: "none",
            color: "#fff",
            cursor: "pointer",
            fontSize: 16,
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "transparent")
          }
        >
          <span>{item.icon}</span>
          <span>{item.name}</span>
        </button>
      ))}
    </div>
  );
}

function CardOption({ icon, name }) {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
        backgroundColor: "#f0f2f5",
        borderRadius: 12,
        margin: 5,
        cursor: "pointer",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
      }}
    >
      <div style={{ fontSize: 32, marginBottom: 8 }}>{icon}</div>
      <div style={{ fontWeight: "bold", fontSize: 16 }}>{name}</div>
    </div>
  );
}

export default function EspaceEnseignant() {
  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Arial, sans-serif" }}>
      <Sidebar menu={menu} />
      <div style={{ flex: 1, padding: 25, display: "flex", flexDirection: "column" }}>
        <h1 style={{ marginBottom: 20 }}>Espace Enseignant</h1>
        <div style={{ flex: 1, backgroundColor: "#000", borderRadius: 12, marginBottom: 20, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
          Live Video Placeholder
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {menu.map((opt) => (
            <CardOption key={opt.name} icon={opt.icon} name={opt.name} />
          ))}
        </div>
      </div>
    </div>
  );
}