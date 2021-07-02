import React from 'react'
import Header from "./../Components/Myheader/Header";
import Headerwithlogin from "../Components/Myheader/Headerwithlogin";
import Token from "./../Components/TokenComponent/Token.component"
const TrackAmbulancepage = () => {
    return (
        <div>
      {localStorage.getItem("token")==null ? (
            <Header location="token" />
          ) : (
            <Headerwithlogin location="token" />
          )
      }
        <Token />
        </div>
    )
}

export default TrackAmbulancepage
