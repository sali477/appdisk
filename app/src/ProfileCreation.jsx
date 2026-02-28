
import React, { useState, useRef } from "react";
import { FaLinkedin, FaGithub, FaCamera, FaFilePdf } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ProfileCreation() {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    city: "",
    bio: "",
    linkedin: "",
    github: "",
    cv: "",
    photoURL: "",
  });

  const fileRef = useRef();
  const cvRef = useRef();
  const navigate = useNavigate();

  const openPhotoPicker = () => fileRef.current.click();
  const openCvPicker = () => cvRef.current.click();

  const handlePhoto = (e) => {
    const f = e.target.files[0];
    if (f) setProfile({ ...profile, photoURL: URL.createObjectURL(f) });
  };

  const handleCv = (e) => {
    const f = e.target.files[0];
    if (f) setProfile({ ...profile, cv: f.name });
  };

  const change = (field, value) => {
    setProfile((p) => ({ ...p, [field]: value }));
  };

  const goToPage = () => {
    navigate("/mypage");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "40px",
        background: "#f3fbfc",
        fontFamily: "Arial",
      }}
    >
      {/* LEFT PREVIEW */}
      <div
        style={{
          width: "350px",
          background: "white",
          padding: "30px",
          borderRadius: "20px",
          boxShadow: "0 6px 25px rgba(0,0,0,0.12)",
          marginRight: "30px",
          textAlign: "center",
        }}
      >
        {/* PHOTO */}
        <div
          style={{
            width: "160px",
            height: "160px",
            borderRadius: "50%",
            margin: "auto",
            border: "4px solid #2ecfcd",
            overflow: "hidden",
          }}
        >
          {profile.photoURL ? (
            <img
              src={profile.photoURL}
              alt="profile"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div
              style={{
                color: "#2ecfcd",
                fontSize: "30px",
                paddingTop: "55px",
                textAlign: "center",
              }}
            >
              <FaCamera />
            </div>
          )}
        </div>

        <button
          onClick={openPhotoPicker}
          style={{
            marginTop: "12px",
            padding: "10px 18px",
            background: "#2ecfcd",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Choisir une photo
        </button>

        <input
          type="file"
          ref={fileRef}
          style={{ display: "none" }}
          onChange={handlePhoto}
        />

        <h2 style={{ marginTop: "20px", color: "#333" }}>
          {profile.firstName || "Prénom"} {profile.lastName || "Nom"}
        </h2>

        <p style={{ color: "#777" }}>{profile.city || "Ville / Université"}</p>

        <p
          style={{
            background: "#d8f9f8",
            padding: "12px",
            borderRadius: "12px",
            color: "#444",
            fontSize: "14px",
            marginTop: "15px",
          }}
        >
          {profile.bio || "Bio professionnelle…"}
        </p>

        <div style={{ fontSize: "25px", marginTop: "12px" }}>
          {profile.linkedin && (
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              style={{ color: "#0077b5", margin: "0 10px" }}
            >
              <FaLinkedin />
            </a>
          )}

          {profile.github && (
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              style={{ color: "#333", margin: "0 10px" }}
            >
              <FaGithub />
            </a>
          )}

          {profile.cv && (
            <span style={{ color: "#d9534f", margin: "0 10px" }}>
              <FaFilePdf />
            </span>
          )}
        </div>
      </div>

      {/* FORM */}
      <div
        style={{
          width: "550px",
          background: "white",
          padding: "30px",
          borderRadius: "20px",
          boxShadow: "0 6px 25px rgba(0,0,0,0.12)",
        }}
      >
        <h2 style={{ color: "#2ecfcd" }}>Informations personnelles</h2>

        <input
          type="text"
          placeholder="Nom"
          value={profile.lastName}
          onChange={(e) => change("lastName", e.target.value)}
          style={input}
        />

        <input
          type="text"
          placeholder="Prénom"
          value={profile.firstName}
          onChange={(e) => change("firstName", e.target.value)}
          style={input}
        />

        <input
          type="text"
          placeholder="Ville / Université"
          value={profile.city}
          onChange={(e) => change("city", e.target.value)}
          style={input}
        />

        <textarea
          placeholder="Bio professionnelle…"
          value={profile.bio}
          onChange={(e) => change("bio", e.target.value)}
          style={{ ...input, height: "120px" }}
        />

        <h3 style={{ color: "#2ecfcd" }}>Liens Professionnels</h3>

        <input
          type="text"
          placeholder="LinkedIn URL"
          value={profile.linkedin}
          onChange={(e) => change("linkedin", e.target.value)}
          style={input}
        />

        <input
          type="text"
          placeholder="GitHub URL"
          value={profile.github}
          onChange={(e) => change("github", e.target.value)}
          style={input}
        />

        {/* CV UPLOAD */}
        <button
          onClick={openCvPicker}
          style={{
            marginTop: "12px",
            padding: "10px 18px",
            background: "#28bdbb",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Ajouter CV (PDF)
        </button>

        <input
          type="file"
          ref={cvRef}
          style={{ display: "none" }}
          onChange={handleCv}
          accept="application/pdf"
        />

        {profile.cv && (
          <p style={{ marginTop: "10px", color: "#444" }}>
            📄 Fichier ajouté : <strong>{profile.cv}</strong>
          </p>
        )}

        {/* BOUTON CREER PAGE À GAUCHE */}
        <div style={{ display: "flex", justifyContent: "flex-start", marginTop: "20px" }}>
          <button
            onClick={goToPage}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px 25px",
              background: "#2ecfcd",
              color: "white",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#26b0b0";
              e.target.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "#2ecfcd";
              e.target.style.transform = "scale(1)";
            }}
          >
            Créer votre page &nbsp;➡
          </button>
        </div>
      </div>
    </div>
  );
}

const input = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #ccc",
  margin: "10px 0",
  fontSize: "15px",
  outlineColor: "#2ecfcd",
};
