import React, { useState } from "react";
import "./Contact.css";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // You would typically handle your backend/api call here
    setSubmitted(true);
  };

  return (
    <div className="contact">
    <div className="contact-section">
      <div className="contact-container">
        <div className="contact-left">
          <h2>Contact Us</h2>
          <p>We'd love to hear from you! Fill out the form or reach us directly:</p>
          <ul className="contact-info">
            <li><strong>Email:</strong> support@yourbrand.com</li>
            <li><strong>Phone:</strong> +91-9876543210</li>
            <li><strong>Address:</strong> 101, Mega Fashion Group, Mumbai, India</li>
          </ul>
        </div>
        <div className="contact-right">
          {submitted ? (
            <div className="contact-success">Thank you! Your message has been sent.</div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                rows="5"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                required
              />
              <button type="submit">Send Message</button>
            </form>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}

export default Contact;
