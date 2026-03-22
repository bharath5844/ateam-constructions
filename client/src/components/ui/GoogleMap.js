import React from 'react';
import './GoogleMap.css';

export default function GoogleMap() {
  return (
    <div className="map-section">
      <div className="container">
        <div className="map-header">
          <div className="section-tag">Find Us</div>
          <h2 className="section-title">Our Location</h2>
          <p className="map-desc">Visit us at our office in Shankarpalle, Telangana</p>
        </div>
        <div className="map-wrapper">
          <iframe
            title="A-Team Constructions Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.2!2d78.1317!3d17.4612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcbf44b0b0b0b0b%3A0x0!2sShankarpalle%2C+Telangana+501203!5e0!3m2!1sen!2sin!4v1&q=17.4612,78.1317"
            width="100%"
            height="420"
            style={{ border:0, borderRadius:'8px', display:'block' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="map-overlay-card">
            <div className="map-card-icon">📍</div>
            <div>
              <div className="map-card-title">A-Team Constructions</div>
              <div className="map-card-address">
                Shop No 5-144/25/2,<br/>
                Bdl X Road, Shankarpalle,<br/>
                Telangana 501203
              </div>
              <a
                href="https://maps.app.goo.gl/MhWLNKNPUPemggkt7"
                target="_blank"
                rel="noreferrer"
                className="map-directions-btn"
              >
                Get Directions →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
