import React, { useEffect, useState } from "react";
import { useHistory, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import firebaseConfig from "./firebaseConfig";
import * as firebaseui from "firebaseui";
import firebase from "firebase";
import "firebaseui/dist/firebaseui.css";
import { toast } from "react-toastify";
const delay=require("delay");
function Otp() {
    const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState("");
  const [number, setNumber] = useState(0);
  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    const uiConfig = {
      signInSuccessUrl: "https://server.prioritypulse.co.in",
      signInOptions: [
        {
          provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
          defaultCountry: "IN",
        },
      ],
      callbacks: {
        signInSuccess: (user) => {
          const userDetails = {
            number: user.phoneNumber.slice(3, 13),
          };
          fetch("https://server.prioritypulse.co.in/auth/usersignin", {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              number: userDetails.number,
            }),
          })
            .then((res) => res.json())
            .then(async (result) => {
              console.log(result);
              
              localStorage.setItem("token", result["token"]);
              history.push("/home");
            })
            .catch((error) => console.log(error));
          
        },
      },

      signInSuccessUrl: "https://server.prioritypulse.co.in",
    };
    if (firebaseui.auth.AuthUI.getInstance()) {
      const ui = firebaseui.auth.AuthUI.getInstance();
      ui.start("#firebaseui-auth-container", uiConfig);
    } else {
      const ui = new firebaseui.auth.AuthUI(firebase.auth());
      ui.start("#firebaseui-auth-container", uiConfig);
    }
  }, []);


  return (
    <div className="outer-firebase">
      <div id="firebaseui-auth-container" className="firebase-input"></div>
    </div>
  );
}
export default Otp;
