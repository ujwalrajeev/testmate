import "./LandingPage.scss";
import React, { useEffect, useRef } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Signin from "../../api/Signin";

function LandingPage() {
  const navigate = useNavigate(); 
  const lp_error_message = useRef(null);

  const redirect = () => {
    navigate("/home");
  }

  const checkMail = (email) => {
    const splitedMail = email.split("@");
    // if (splitedMail[1] !== "qburst.com"){
    //   return false;
    // }
    // else{
    //   return true;
    // }

    return((splitedMail[1] === "qburst.com") ? true : false);
  }

  const handleCallbackResponse = (response) => {
    const userObject = jwtDecode(response.credential);

    const object = { 
      token: response.credential
    };

    const mailValid = checkMail(userObject.email);

    if (mailValid === true){
      Signin(object).then((data) => {
        if (data === 1){
          lp_error_message.current.style.display = "block";
          lp_error_message.innerHTML = "Login success";
          redirect();
        }
      });
    }
    else{
      lp_error_message.current.style.display = "block";
      lp_error_message.current.innerHTML = "Please use a QBurst account";
    }
    
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
    client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    callback: handleCallbackResponse,
    
  });

    google.accounts.id.renderButton(
      document.getElementById("signin_div"),
      {theme: "outline", size: "large", type: "standard", text: "signin_with", shape: "circle"}
    );
  });

  return (
    <div className="lp-main-layout">
      <div className="lp-top">
        <div className="lp-top-left">
          <div className="lp-top-left-contents">
            <img src="assets/background/lp_bg_element_1.png" alt="testmate" className="lp-bg-element"/>
            <img src="assets/logos/logo.png" alt="testmate" className="lp-logo"/>
            <hr className="lp-line-break" />
            <p className="lp-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                   Praesent eget risus vitae massa semper aliquam quis mattis quam. </p>

            <div id="signin_div"></div>

            <p className="lp-error-message" ref={lp_error_message}>
              You have reached an access restricted network!
            </p>
          </div>
        </div>

        <div className="lp-top-right">
          <img src="assets/background/lp_bg.svg" alt="testmate"/>
        </div>
      </div>

      <div className="lp-bottom">
        <p>&copy; 2022</p>
        <img src="assets/logos/qburst-logo.png" alt="qburst"></img>
      </div>
    </div>

  );
}

export default LandingPage;


