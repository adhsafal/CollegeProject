import React from "react";
import "../css/styles.css";

function Features() {
  return (
    <section id="features">
      <div className="div">
        <div className="row">
          <div className="feature-box col-lg-4">
            <i className="icon fas fa-check-circle fa-4x"></i>
            <h3 className="feature-title">Easy to use.</h3>
            <p>So easy to use, even a child could do it.</p>
          </div>

          <div className="feature-box col-lg-4">
            <i className="icon fas fa-bullseye fa-4x"></i>
            <h3 className="feature-title">Maximum Features</h3>
            <p>We have a lot of products, with exciting features.</p>
          </div>

          <div className="feature-box col-lg-4">
            <i className="icon fas fa-heart fa-4x"></i>
            <h3 className="feature-title">Guaranteed to work.</h3>
            <p>Find your appropriate design or your money back.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
