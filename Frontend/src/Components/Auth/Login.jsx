// src/pages/LoginSignup.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from "../../../config"; // adjust path if config.js is not in src/

const LoginSignup = () => {
  const [state, setState] = useState('Login');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleResponse = async (res) => {
    // try to parse json, fallback to text
    const text = await res.text().catch(() => null);
    try {
      return text ? JSON.parse(text) : {};
    } catch {
      return { success: false, error: text || 'Unexpected server response' };
    }
  };

  const login = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });

      const data = await handleResponse(res);

      if (res.ok && data.success) {
        localStorage.setItem('auth-token', data.token);
        navigate('/'); // SPA redirect
      } else {
        alert(data.error || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await handleResponse(res);

      if (res.ok && data.success) {
        localStorage.setItem('auth-token', data.token);
        navigate('/');
      } else {
        alert(data.error || 'Signup failed');
      }
    } catch (err) {
      console.error('Signup error:', err);
      alert('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (state === 'Login') login();
    else signUp();
  };

  return (
    <div className="login-signup">
      <div className="login-signup-container">
        <h1>{state}</h1>
        <form className="login-signup-fields" onSubmit={onSubmit}>
          {state === 'Sign Up' && (
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={changeHandler}
              placeholder="Enter Name"
              required
            />
          )}

          <input
            name="email"
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder="Enter Email"
            required
          />
          <input
            name="password"
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder="Enter Password"
            required
            minLength={6}
          />

          <button type="submit" disabled={loading}>
            {loading ? (state === 'Login' ? 'Logging in...' : 'Signing up...') : 'Continue'}
          </button>
        </form>

        {state === 'Sign Up' ? (
          <p className="login-signup-login">
            Already have an account? <span onClick={() => setState('Login')}>Login here</span>
          </p>
        ) : (
          <p className="login-signup-login">
            Create an account <span onClick={() => setState('Sign Up')}>Click here</span>
          </p>
        )}

        <div className="login-signup-agree">
          <input type="checkbox" id="agree" />
          <label htmlFor="agree">By continuing, I agree to the terms of use & privacy policy.</label>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
