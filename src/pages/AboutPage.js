import React from 'react';
import './AboutPage.css';
import Layout from '../components/Layout/Layout';

const AboutPage = () => {
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <header className="about-heading-container">
            <h1 className="about-heading">About Us</h1>
          </header>
          <div className="about-grid">
            <div>
              <img src="./images/about.jpeg" alt="Company" />
            </div>
            <div className="about-grid-text ">
              <h2>Our Story</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                sed nisi eu nulla maximus rhoncus eu quis orci. Aenean in
                suscipit sapien, ac congue felis. Donec vitae metus auctor,
                hendrerit ipsum eget, aliquam nulla.
              </p>
              <h2>Our Mission</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                sed nisi eu nulla maximus rhoncus eu quis orci. Aenean in
                suscipit sapien, ac congue felis. Donec vitae metus auctor,
                hendrerit ipsum eget, aliquam nulla.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
