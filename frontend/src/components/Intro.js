import React from "react";
import "../css/styles.css";


function Intro () {
    return (
        <>
            <div className="row intro-details">
                    <div className="col-lg-6 col-md-6">
                        <h1 className='style'>STYLE <span style={{ fontSize: "6rem" }}> <br />HUB</span></h1>
                        <hr />
                        <p>Design and create your own T-shirts, hoodies and many more with exciting color options.</p>
                        {/* <button className="btn btn-lg btn-outline-primary"><Link className="nav-link navbar__links" to="/customize">Start Designing</Link></button>  */}
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <img src="images/boy-image-bg.png" alt="Image of a boy" className="img-boy" />
                    </div>
                </div>
        </>
    );
}

export default Intro;