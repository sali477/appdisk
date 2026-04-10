import React, { useState } from 'react';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    institution: '',
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('email'); // 'email' or 'social'

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.role) {
      newErrors.role = 'Please select a role';
    }

    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'You must accept the Terms and Conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({
          fullName: '',
          email: '',
          password: '',
          confirmPassword: '',
          role: '',
          institution: '',
          termsAccepted: false,
        });
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setErrors({ submit: 'Registration failed. Please try again.' });
      }
    } catch (error) {
      setErrors({ submit: 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Logging in with ${provider}`);
    // Implement social login logic here
  };

  return (
    <div className="register-container">
      <div className="register-modal">
        <button className="modal-close">✕</button>

        {/* Logo and Header */}
        <div className="modal-header">
          <div className="logo">
            <div className="logo-icon">E</div>
          </div>
          <h1>Create Your Account</h1>
          <p>Join thousands of students learning today</p>
        </div>

        {success && (
          <div className="success-message">
            ✓ Registration successful! Redirecting...
          </div>
        )}

        {errors.submit && (
          <div className="error-message">
            ✗ {errors.submit}
          </div>
        )}

        {/* Tabs */}
        <div className="tab-buttons">
          <button
            className={`tab-btn ${activeTab === 'email' ? 'active' : ''}`}
            onClick={() => setActiveTab('email')}
          >
            Email
          </button>
          <button
            className={`tab-btn ${activeTab === 'social' ? 'active' : ''}`}
            onClick={() => setActiveTab('social')}
          >
            Social
          </button>
        </div>

        {/* Email Registration Form */}
        {activeTab === 'email' && (
          <form onSubmit={handleSubmit} className="register-form">
            {/* Full Name */}
            <div className="form-group">
              <label htmlFor="fullName">Full Name *</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                className={errors.fullName ? 'input-error' : ''}
              />
              {errors.fullName && (
                <span className="error-text">{errors.fullName}</span>
              )}
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className={errors.email ? 'input-error' : ''}
              />
              {errors.email && (
                <span className="error-text">{errors.email}</span>
              )}
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password *</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Minimum 8 characters"
                className={errors.password ? 'input-error' : ''}
              />
              {errors.password && (
                <span className="error-text">{errors.password}</span>
              )}
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password *</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className={errors.confirmPassword ? 'input-error' : ''}
              />
              {errors.confirmPassword && (
                <span className="error-text">{errors.confirmPassword}</span>
              )}
            </div>

            {/* Role */}
            <div className="form-group">
              <label htmlFor="role">Role *</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={errors.role ? 'input-error' : ''}
              >
                <option value="">-- Select Role --</option>
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
                <option value="developer">Developer</option>
                <option value="other">Other</option>
              </select>
              {errors.role && (
                <span className="error-text">{errors.role}</span>
              )}
            </div>

            {/* Institution */}
            <div className="form-group">
              <label htmlFor="institution">University / School (Optional)</label>
              <input
                type="text"
                id="institution"
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                placeholder="Your institution name"
              />
            </div>

            {/* Terms and Conditions */}
            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                />
                <span>I accept the Terms and Conditions *</span>
              </label>
              {errors.termsAccepted && (
                <span className="error-text">{errors.termsAccepted}</span>
              )}
            </div>

            {/* Submit Button */}
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
        )}

        {/* Social Registration */}
        {activeTab === 'social' && (
          <div className="social-section">
            <button
              className="social-button google"
              onClick={() => handleSocialLogin('google')}
            >
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Sign up with Google
            </button>

            <button
              className="social-button apple"
              onClick={() => handleSocialLogin('apple')}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M17.05 13.5c-.91 2.18-.39 3.5 1.39 5.84 1.3 1.66 2.33 3.04 3.57 3.04.96 0 1.34-1.64.07-4.18-1.27-2.54-2.75-3.17-5.03-4.7z" />
                <path d="M12.02 5.5c-.91 0-2.19 1.23-2.19 3.13 0 2.42 1.87 3.48 3.41 3.48 1.41 0 2.12-.89 2.12-2.17 0-2.05-1.17-4.44-3.34-4.44z" />
              </svg>
              Sign up with Apple
            </button>

            <div className="divider">or</div>

            <div className="email-option">
              <label htmlFor="socialEmail">Email Address</label>
              <input
                type="email"
                id="socialEmail"
                placeholder="your@email.com"
              />
              <button className="email-submit">Continue with Email</button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="modal-footer">
          <p>Already have an account? <a href="/login">Sign in here</a></p>
          <p className="legal">By signing up, you accept our <a href="/terms">Terms</a> and <a href="/privacy">Privacy Policy</a></p>
        </div>
      </div>
    </div>
  );
};

export default Register;