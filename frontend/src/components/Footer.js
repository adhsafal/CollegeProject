import React from "react";
import "../css/styles.css";

/* REACT-BOOTSTRAP */
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <div>
        <footer id="footer" className="white-section">
        <div>
          <i className="social-icon fab fa-twitter"></i>
          <i className="social-icon fab fa-facebook-f"></i>
          <i className="social-icon fab fa-instagram"></i>
          <i className="social-icon far fa-envelope"></i>
          <p>© Copyright StyleHub</p>
        </div>
      </footer>
      </div>
  );
}

export default Footer;
