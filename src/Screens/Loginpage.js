import React from "react";
import Header from "../Components/Myheader/Header";
import Headerwithlogin from "../Components/Myheader/Headerwithlogin";
import "../css/Loginpage.css";
import NewSlider from "../Components/Slider/NewSlider";
import Phoneverify from "./../Components/Firebase/phoneverify";
import Whychooseus from "../Components/Whychooseus";

const tutorialSteps = [
  {
    label: "San Francisco – Oakland Bay Bridge, United States",
    imgPath:
      "https://annapoornaeyehospital.com/wp-content/uploads/2016/06/1427405029369.jpg",
  },
  {
    label: "Bird",
    imgPath:
      "https://images.unsplash.com/photo-1579037005241-a79202c7e9fd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
  },
  {
    label: "Bali, Indonesia",
    imgPath:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80",
  },
];

const Loginpage = () => {
  
  return (
    <div>
      {localStorage.getItem("token") == null ? (
        <Header location="login" />
      ) : (
        <Headerwithlogin location="login" />
      )}
      <div class="maindiv fadeInDown">
        <div class="div1">
          <div className="mysignupform">
            <div class="main">
              <p className="sign" align="center">
                Sign in
                <p class="welcometext" style={{ color: "black" }}>
                  Welcome to Priority Pulse
                  <p style={{ color: "black" }}>Your pulse,Our Priority</p>
                </p>
                <br />
              </p>
              <div style={{ marginTop: "-65px" }}>
                <Phoneverify />
              </div>
            </div>
          </div>
        </div>

        <div class="div2">
          <div className="mynewslider">
            <NewSlider tutorialSteps={tutorialSteps} />
          </div>
        </div>
      </div>

      <Whychooseus />
    </div>
  );
};

export default Loginpage;
