import React from 'react'
import Header from "./../Components/Myheader/Header"
import Headerwithlogin from "../Components/Myheader/Headerwithlogin";
import HospitalList from './../Components/Homepage/HospitalList'
const Homepage = () => {
    
    return (
      <>
        <div>
          {localStorage.getItem("token")==null ? (
            <Header location="home" />
          ) : (
            <Headerwithlogin location="home" />
          )}
          <HospitalList />
          {/* <HomePageComponent /> */}
        </div>
      </>
    );
}

export default Homepage
