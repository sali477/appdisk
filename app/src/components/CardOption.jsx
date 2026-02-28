// src/components/CardOption.jsx
import React from "react";

export default function CardOption({ icon, name, onClick }) {
  return (
    <div className="card-option" onClick={onClick}>
      <span className="card-icon">{icon}</span>
      <h3 className="card-name">{name}</h3>
    </div>
  );
}