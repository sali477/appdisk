import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AIChat from './AIChat';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const navigate = useNavigate();
  
  const [professors, setProfessors] = useState([
    {
      id: 1,
      name: 'Dr. Sarah Mitchell',
      subject: 'Machine Learning',
      image: 'https://via.placeholder.com/150?text=Sarah',
      live: true,
      bio: 'Expert in AI and Machine Learning with 10+ years experience',
      lessons: [
        { id: 1, title: 'Introduction to ML', duration: '2 hours' },
        { id: 2, title: 'Neural Networks', duration: '3 hours' },
        { id: 3, title: 'Deep Learning', duration: '4 hours' },
      ]
    },
    {
      id: 2,
      name: 'Prof. James Chen',
      subject: 'Web Development',
      image: 'https://via.placeholder.com/150?text=James',
      live: false,
      bio: 'Full-stack developer and web architecture specialist',
      lessons: [
        { id: 4, title: 'React Basics', duration: '2.5 hours' },
        { id: 5, title: 'Advanced JavaScript', duration: '3.5 hours' },
      ]
    },
    {
      id: 3,
      name: 'Dr. Emma Rodriguez',
      subject: 'Data Science',
      image: 'https://via.placeholder.com/150?text=Emma',
      live: true,
      bio: 'Data science leader and analytics expert',
      lessons: [
        { id: 6, title: 'Data Analysis', duration: '2 hours' },
        { id: 7, title: 'Statistical Methods', duration: '3 hours' },
      ]
    },
    {
      id: 4,
      name: 'Prof. Alex Torres',
      subject: 'Cloud Architecture',
      image: 'https://via.placeholder.com/150?text=Alex',
      live: false,
      bio: 'Cloud infrastructure and DevOps expert',
      lessons: [
        { id: 8, title: 'AWS Fundamentals', duration: '3 hours' },
        { id: 9, title: 'Kubernetes', duration: '4 hours' },
      ]
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [userName] = useState('Hajar');

  const filteredProfessors = professors.filter(
    (professor) =>
      professor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      professor.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewProfile = (professorId) => {
    navigate(`/professor/${professorId}`);
  };

  const handleLogout = () => {
    console.log('User logged out');
    // Add logout logic here
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <h1 className="welcome-text">Welcome back, {userName} 👋</h1>
        </div>
        <div className="header-right">
          <div className="notification-icon">
            <span className="notification-badge">3</span>
            🔔
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {/* AI Chat Assistant */}
      <AIChat professors={professors} />

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search professors, lessons..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Professors Section */}
      <section className="professors-section">
        <h2 className="section-title">
          Your <span className="highlight">Followed Professors</span>
        </h2>
        <p className="section-subtitle">
          Continue learning with your favorite instructors
        </p>

        {/* Professor Cards Grid */}
        <div className="professors-grid">
          {filteredProfessors.map((professor) => (
            <div key={professor.id} className="professor-card">
              {professor.live && <span className="live-badge">LIVE</span>}

              <div className="profile-image-container">
                <img
                  src={professor.image}
                  alt={professor.name}
                  className="profile-image"
                />
              </div>

              <h3 className="professor-name">{professor.name}</h3>
              <p className="professor-subject">{professor.subject}</p>

              <button
                className="view-profile-btn"
                onClick={() => handleViewProfile(professor.id)}
              >
                View Profile →
              </button>
            </div>
          ))}
        </div>

        {filteredProfessors.length === 0 && (
          <div className="no-results">
            <p>No professors found matching "{searchTerm}"</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default StudentDashboard;