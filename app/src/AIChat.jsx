import React, { useState } from 'react';
import './AIChat.css';

const AIChat = ({ professors }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your AI Study Assistant. Ask me anything about lessons, professors, or help with your studies! 📚",
      sender: 'ai',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // Extract all lessons from professors
  const allLessons = professors.flatMap(prof => 
    prof.lessons.map(lesson => ({
      ...lesson,
      professorName: prof.name,
      professorSubject: prof.subject
    }))
  );

  // AI Response Logic
  const generateAIResponse = (userMessage) => {
    const message = userMessage.toLowerCase();

    // Lesson recommendations
    if (message.includes('recommend') || message.includes('suggest')) {
      const randomLesson = allLessons[Math.floor(Math.random() * allLessons.length)];
      return `I recommend "${randomLesson.title}" by ${randomLesson.professorName}. It covers ${randomLesson.professorSubject} and takes ${randomLesson.duration}. Would you like to enroll? 🎓`;
    }

    // Search for specific lesson
    if (message.includes('lesson') || message.includes('course')) {
      const matchedLessons = allLessons.filter(l => 
        l.title.toLowerCase().includes(message) || 
        l.professorSubject.toLowerCase().includes(message)
      );
      
      if (matchedLessons.length > 0) {
        const lessons = matchedLessons.slice(0, 3).map(l => 
          `"${l.title}" by ${l.professorName} (${l.duration})`
        ).join(', ');
        return `Found these lessons: ${lessons}. Which one interests you? 📖`;
      }
    }

    // Professor information
    if (message.includes('professor') || message.includes('teacher')) {
      const matchedProfs = professors.filter(p => 
        p.name.toLowerCase().includes(message) || 
        p.subject.toLowerCase().includes(message)
      );
      
      if (matchedProfs.length > 0) {
        const prof = matchedProfs[0];
        return `${prof.name} teaches ${prof.subject} and is rated ${prof.rating}⭐. They have ${prof.lessons.length} courses available. Interested in any? 👨‍🏫`;
      }
    }

    // Study help
    if (message.includes('help') || message.includes('stuck') || message.includes('understand')) {
      return `I'm here to help! 💪 I can:\n- Recommend lessons\n- Explain topics\n- Find professors\n- Answer questions about courses\n\nWhat do you need help with? 🤔`;
    }

    // Duration questions
    if (message.includes('how long') || message.includes('duration')) {
      const durations = [...new Set(allLessons.map(l => l.duration))];
      return `Our lessons range from ${Math.min(...durations.match(/\d+/g))} to ${Math.max(...durations.match(/\d+/g))} hours. Different topics have different complexities! ⏱️`;
    }

    // Default responses
    const defaultResponses = [
      "That's interesting! Would you like me to recommend a lesson or find a specific professor? 🎯",
      "I can help you find the perfect course! Tell me what you want to learn about. 📚",
      "Great question! Ask me about lessons, professors, or recommendations. 💡",
      "I'm here to guide your learning journey! What would you like to explore? 🚀",
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  // Handle send message
  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue);
      const aiMessage = {
        id: messages.length + 2,
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="ai-chat-container">
      {/* Chat Bubble Button */}
      <button 
        className="chat-bubble-btn"
        onClick={() => setIsOpen(!isOpen)}
        title="AI Study Assistant"
      >
        🤖
        <span className="pulse"></span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h3>🤖 AI Study Assistant</h3>
            <button className="close-btn" onClick={() => setIsOpen(false)}>×</button>
          </div>

          <div className="chat-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`message ${msg.sender}`}>
                <div className="message-content">
                  {msg.text.split('\n').map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="message ai">
                <div className="message-content typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
          </div>

          <form className="chat-input-form" onSubmit={handleSendMessage}>
            <input
              type="text"
              placeholder="Ask about lessons, professors..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isTyping}
            />
            <button type="submit" disabled={isTyping || !inputValue.trim()}>
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AIChat;