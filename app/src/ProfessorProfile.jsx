import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProfessorProfile.css';

const ProfessorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const professorsData = [
    {
      id: 1,
      name: 'Dr. Sarah Mitchell',
      subject: 'Machine Learning',
      image: 'https://via.placeholder.com/300?text=Sarah',
      live: true,
      bio: 'Expert in AI and Machine Learning with 10+ years experience. Specializes in deep learning and neural networks.',
      rating: 4.8,
      students: 1250,
      email: 'sarah.mitchell@university.edu',
      lessons: [
        { id: 1, title: 'Introduction to ML', duration: '2 hours', students: 350, rating: 4.9 },
        { id: 2, title: 'Neural Networks', duration: '3 hours', students: 280, rating: 4.8 },
        { id: 3, title: 'Deep Learning', duration: '4 hours', students: 200, rating: 4.7 },
      ]
    },
    {
      id: 2,
      name: 'Prof. James Chen',
      subject: 'Web Development',
      image: 'https://via.placeholder.com/300?text=James',
      live: false,
      bio: 'Full-stack developer and web architecture specialist with expertise in modern JavaScript frameworks.',
      rating: 4.7,
      students: 980,
      email: 'james.chen@university.edu',
      lessons: [
        { id: 4, title: 'React Basics', duration: '2.5 hours', students: 420, rating: 4.8 },
        { id: 5, title: 'Advanced JavaScript', duration: '3.5 hours', students: 310, rating: 4.7 },
      ]
    },
    {
      id: 3,
      name: 'Dr. Emma Rodriguez',
      subject: 'Data Science',
      image: 'https://via.placeholder.com/300?text=Emma',
      live: true,
      bio: 'Data science leader and analytics expert specializing in predictive modeling and statistical analysis.',
      rating: 4.9,
      students: 1100,
      email: 'emma.rodriguez@university.edu',
      lessons: [
        { id: 6, title: 'Data Analysis', duration: '2 hours', students: 380, rating: 4.9 },
        { id: 7, title: 'Statistical Methods', duration: '3 hours', students: 290, rating: 4.8 },
      ]
    },
    {
      id: 4,
      name: 'Prof. Alex Torres',
      subject: 'Cloud Architecture',
      image: 'https://via.placeholder.com/300?text=Alex',
      live: false,
      bio: 'Cloud infrastructure and DevOps expert with certifications in AWS and Kubernetes.',
      rating: 4.6,
      students: 850,
      email: 'alex.torres@university.edu',
      lessons: [
        { id: 8, title: 'AWS Fundamentals', duration: '3 hours', students: 450, rating: 4.7 },
        { id: 9, title: 'Kubernetes', duration: '4 hours', students: 320, rating: 4.6 },
      ]
    },
  ];

  const professor = useMemo(() => 
    professorsData.find(p => p.id === parseInt(id)),
    [id]
  );

  const [enrolledLessons, setEnrolledLessons] = useState([]);

  if (!professor) {
    return (
      <div className="profile-container">
        <div className="not-found">
          <h2>Professor not found</h2>
          <button onClick={() => navigate('/')} className="back-btn">
            ← Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const handleEnroll = (lessonId) => {
    if (!enrolledLessons.includes(lessonId)) {
      setEnrolledLessons([...enrolledLessons, lessonId]);
    }
  };

  return (
    <div className="profile-container">
      {/* Back Button */}
      <button onClick={() => navigate('/')} className="back-btn">
        ← Back to Dashboard
      </button>

      {/* Professor Header */}
      <div className="professor-header">
        <img src={professor.image} alt={professor.name} className="header-image" />
        
        <div className="header-content">
          <div className="header-title">
            <h1>{professor.name}</h1>
            {professor.live && <span className="live-badge">🔴 LIVE NOW</span>}
          </div>
          
          <p className="subject-tag">{professor.subject}</p>
          
          <div className="stats">
            <div className="stat">
              <span className="stat-value">{professor.rating}</span>
              <span className="stat-label">Rating ⭐</span>
            </div>
            <div className="stat">
              <span className="stat-value">{professor.students}+</span>
              <span className="stat-label">Students</span>
            </div>
          </div>

          <p className="bio">{professor.bio}</p>
          
          <p className="contact">
            <strong>Email:</strong> {professor.email}
          </p>
        </div>
      </div>

      {/* Lessons Section */}
      <section className="lessons-section">
        <h2>Courses & Lessons</h2>
        <div className="lessons-grid">
          {professor.lessons.map((lesson) => (
            <div key={lesson.id} className="lesson-card">
              <h3>{lesson.title}</h3>
              <div className="lesson-info">
                <span>⏱️ {lesson.duration}</span>
                <span>👥 {lesson.students} students</span>
                <span>⭐ {lesson.rating}</span>
              </div>
              <button
                className={`enroll-btn ${enrolledLessons.includes(lesson.id) ? 'enrolled' : ''}`}
                onClick={() => handleEnroll(lesson.id)}
                disabled={enrolledLessons.includes(lesson.id)}
              >
                {enrolledLessons.includes(lesson.id) ? '✓ Enrolled' : 'Enroll Now'}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProfessorProfile;