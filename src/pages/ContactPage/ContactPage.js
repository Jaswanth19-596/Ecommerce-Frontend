import React from "react";
import "./ContactPage.css";
import Layout from "../../components/Layout/Layout";

const ContactPage = () => {
  return (
    <Layout>
      <section className="contact-section">
        <form className="contact-form">
          <h3 className="heading-tertiary text-center">Contact Us</h3>
          <div className="input-group">
            <label for="name" className="label">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="input"
            />
          </div>

          <div className="input-group">
            <label for="email" className="label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="input"
            />
          </div>

          <div className="input-group">
            <label for="message" className="label">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              required
              className="textarea"
            ></textarea>
          </div>

          <div className="button-container">
            <button className="submit-button" type="submit">
              Submit
            </button>
          </div>
        </form>
        <address className="address">
          <h3 className="heading-tertiary text-center">Our Address</h3>
          <ul>
            <li>123 Main Street</li>
            <li>Anytown, USA 12345</li>
            <li>Phone: (123) 456-7890</li>
            <li>Email: info@example.com</li>
          </ul>
        </address>
      </section>
    </Layout>
  );
};

export default ContactPage;
