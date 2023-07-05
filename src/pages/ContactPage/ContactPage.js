import React, { useState } from 'react';
import { useRef } from 'react';
import './ContactPage.css';
import Layout from '../../components/Layout/Layout';
import { BsFillTelephoneOutboundFill } from 'react-icons/bs';
import { HiLocationMarker, HiMail } from 'react-icons/hi';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Loading from './../../components/Loading';

const ContactPage = () => {
  const form = useRef();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    emailjs
      .sendForm(
        'service_336l49i',
        'template_d9sebc8',
        form.current,
        'RFMf-l38qADeDnHLi'
      )
      .then(
        (result) => {
          toast.success('Email sent successfully');
          navigate('/home');
        },
        (error) => {
          toast.error('Error while sending the email');
        }
      );
    setIsLoading(false);
  };

  return (
    <Layout>
      <section className="contact-section">
        <div className="contact-upper-container">
          <h1 className="contact-heading text-center">Let's Talk !</h1>
          <p className="contact-sub-heading">
            I would love to connect with you.
          </p>
          <div className="contact-items-container">
            <div className="contact-item">
              <div className="contact-item-icon-container">
                <BsFillTelephoneOutboundFill className="contact-item-icon" />
                <p className="upper-text">Call me at</p>
                <p className="lower-text">+91 7013405593</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-item-icon-container">
                <HiLocationMarker className="contact-item-icon" />
                <p className="upper-text">19-596</p>
                <p className="lower-text">Mars, Galaxy, Universe</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-item-icon-container">
                <HiMail className="contact-item-icon" />
                <p className="upper-text">Email me at</p>
                <p className="lower-text">madhajaswanth@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        {isLoading && <Loading />}

        {!isLoading && (
          <form ref={form} className="contact-form" onSubmit={sendEmail}>
            <h3 className="heading-tertiary text-center contact-form-heading">
              Contact
            </h3>
            <p className="contact-form-description">
              You can contact me through this form and I will get back to you as
              soon as possible
            </p>
            <div className="input-group">
              <label htmlFor="name" className="label">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="user_name"
                required
                className="input"
              />
            </div>

            <div className="input-group">
              <label htmlFor="email" className="label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="user_email"
                required
                className="input"
              />
            </div>

            <div className="input-group">
              <label htmlFor="message" className="label">
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
              <button className="button" type="submit">
                Submit
              </button>
            </div>
          </form>
        )}
      </section>
    </Layout>
  );
};

export default ContactPage;
