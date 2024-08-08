import React from 'react';
import { Link } from 'react-router-dom';

import './Footer.css';

const Footer = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <footer className="footer col-12">
          <h5>By Jaswanth & Chandra Sekhar Reddy</h5>
          <p className="footer-description">Founders & CEOs of Nothing</p>
          <div className="footer-links-container">
            <Link to="/about" className="footer-link">
              About
            </Link>
            <Link to="/policy" className="footer-link">
              Privacy policy
            </Link>
            <Link to="/contact" className="footer-link">
              Contact
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
