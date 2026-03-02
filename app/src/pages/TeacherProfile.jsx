 import React, { useState } from "react";
import "../styles/App.css";

function TeacherProfile() {
  const [activeMenu, setActiveMenu] = useState("courses");
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState("Your Name");
  const [role, setRole] = useState("Your Role");
  const [description, setDescription] = useState("");
  const [cv, setCv] = useState(["", "", ""]);

  // New state for courses
  const [courses, setCourses] = useState([]);
  const [newCourseTitle, setNewCourseTitle] = useState("");
  const [newCourseDesc, setNewCourseDesc] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [driveLink, setDriveLink] = useState("");

  const menuItems = [
    { id: "courses", label: "Courses", icon: "📘" },
    { id: "exam", label: "Exam", icon: "📝" },
    { id: "live", label: "Live Video", icon: "🎥" },
  ];

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(URL.createObjectURL(e.target.files[0]));
    }
  };

  const addCvItem = () => setCv([...cv, ""]);
  const updateCvItem = (index, value) => {
    const newCv = [...cv];
    newCv[index] = value;
    setCv(newCv);
  };

  // Handle PDF upload
  const handlePdfChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPdfFile(e.target.files[0].name); // just filename for display
    }
  };

  const addCourse = () => {
    if (newCourseTitle.trim() === "") return;
    setCourses([
      ...courses,
      {
        id: Date.now(),
        title: newCourseTitle,
        description: newCourseDesc,
        pdf: pdfFile,
        drive: driveLink
      }
    ]);
    setNewCourseTitle("");
    setNewCourseDesc("");
    setPdfFile(null);
    setDriveLink("");
  };

  return (
    <div className="profile-page">
      <div className="profile-container">

        {/* Profile Header */}
        <div className="profile-header">
          <label className="profile-photo-label">
            <input type="file" onChange={handlePhotoChange} style={{ display: "none" }} />
            <div className="profile-photo">
              {photo ? <img src={photo} alt="Profile" /> : <span>Upload Photo</span>}
            </div>
          </label>
          <div>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="editable-text name-input"
            />
            <input 
              type="text" 
              value={role} 
              onChange={(e) => setRole(e.target.value)} 
              className="editable-text role-input"
            />
          </div>
        </div>

        {/* Description */}
        <div className="section">
          <h3>Description</h3>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            className="editable-textarea" 
            placeholder="Write your description here..."
          />
        </div>

        {/* CV */}
        <div className="section">
          <h3>CV / Resume</h3>
          <ul>
            {cv.map((item, index) => (
              <li key={index}>
                <input 
                  type="text" 
                  value={item} 
                  onChange={(e) => updateCvItem(index, e.target.value)}
                  className="editable-text"
                  placeholder={`CV item ${index + 1}`}
                />
              </li>
            ))}
          </ul>
          <button onClick={addCvItem} className="add-btn">+ Add CV item</button>
        </div>

        {/* Learning Hub Menu */}
        <div className="section">
          <h3>Learning Hub</h3>

          {/* --- Add Course Section --- */}
          {activeMenu === "courses" && (
            <div style={{ marginBottom: "15px", padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}>
              <h4>Create New Course</h4>
              <input
                type="text"
                placeholder="Course Title"
                value={newCourseTitle}
                onChange={(e) => setNewCourseTitle(e.target.value)}
              /><br />
              <textarea
                placeholder="Course Description"
                value={newCourseDesc}
                onChange={(e) => setNewCourseDesc(e.target.value)}
              /><br />
              <label>
                Upload PDF: <input type="file" onChange={handlePdfChange} accept="application/pdf" />
                {pdfFile && <span> {pdfFile}</span>}
              </label><br />
              <input
                type="text"
                placeholder="Google Drive / Resource Link"
                value={driveLink}
                onChange={(e) => setDriveLink(e.target.value)}
              /><br />
              <button onClick={addCourse} className="add-btn">+ Add Course</button>
            </div>
          )}

          {/* --- Menu Tabs --- */}
          <div className="menu-tabs">
            {menuItems.map((item) => (
              <button
                key={item.id}
                className={`menu-button ${activeMenu === item.id ? "active" : ""}`}
                onClick={() => setActiveMenu(item.id)}
              >
                <span className="icon">{item.icon}</span> {item.label}
              </button>
            ))}
          </div>

          <div className="menu-content">
            {activeMenu === "courses" && (
              <ul>
                {courses.length === 0 && <li>No courses yet</li>}
                {courses.map((c) => (
                  <li key={c.id}>
                    <b>{c.title}</b> - {c.description}
                    {c.pdf && ` | PDF: ${c.pdf}`}
                    {c.drive && ` | Drive: ${c.drive}`}
                  </li>
                ))}
              </ul>
            )}
            {activeMenu === "exam" && <div className="placeholder-card">Exams will appear here</div>}
            {activeMenu === "live" && <div className="placeholder-card">Live sessions will appear here</div>}
          </div>
        </div>

        {/* Statistics */}
        <div className="section">
          <h3>Statistics</h3>
          <div className="stats-grid">
            <div className="stat-card placeholder-card">Statistic 1</div>
            <div className="stat-card placeholder-card">Statistic 2</div>
            <div className="stat-card placeholder-card">Statistic 3</div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default TeacherProfile;