import React from "react";
import "../css/styles.css";

function Contact() {
  return (
    <>
      <section id="contact">
        <div className="row">
          <div className="col-lg-4 col-md-4 contact-text">
            <i className="icon fa fa-address-card fa-3x" aria-hidden="true"></i>
            <h2>Address</h2>
            <p>
              52 SS Tole, Thimi Marg, <br />
              Kathmandu, Nepal.
            </p>
          </div>
          <div className="col-lg-4 col-md-4 contact-text">
            <i className="icon fas fa-phone fa-3x"></i>
            <h2>Phone</h2>
            <p>
              Phone: (+977) 9843123456 <br />
              Fax: +02 05 001 114
            </p>
          </div>
          <div className="col-lg-4 col-md-4 contact-text">
            <i className="far fa-envelope fa-3x icon"></i>
            <h2>Email</h2>
            <p>
              support@stylehub.com <br />
              Twitter: @stylehub
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
