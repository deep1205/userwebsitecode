import React,{useState} from 'react'
import axios from 'axios'
import GoogleMapReact from "google-map-react";
import './tokenComponent.style.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Track=(props)=>{


   const defaultProps = {
     center: {
       lat: 22.9734229,
lng: 78.6568942
     },
     zoom: 12,
   };



    const [isChecked,setChecked]=useState(false)
    const [rideid,setRideId]=useState("")
    const handleRideId=(e)=>{
      setRideId(e.target.value)
    }
    const handleCheckBox=()=>{
      setChecked(isChecked=>!isChecked)
    }
    
    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.put('https://server.prioritypulse.co.in/users/activeRideById',{
          rideid:rideid
        })
        .then(response=>{
          sessionStorage.setItem('rideid',rideid)
          window.location.href='/track'
        })
        .catch((err)=>{
          toast.error('Invalid ride Id', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        }) 
      }
      const style={
        top:'-50px',
        width:'100%',
        height:'90%'
      }
      return (
        <div>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <div style={{ height: "100vh", width: "100%" ,position:"absolute"}}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: "AIzaSyATwnp3e3ZL7__Oskpdo8Gutgls6ir4FeU",
              }}
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
            ></GoogleMapReact>
          </div>
          <div class="login-page">
            <div class="form">
              <div class="login-header">Track Ambulance</div>
              <form onSubmit={handleSubmit}>
                <div className="group">
                  <input
                    type="text"
                    name="tokenID"
                    value={rideid}
                    placeholder="Enter your token here"
                    onChange={handleRideId}
                  />
                </div>
                <div className="group">
                  <input
                    type="checkbox"
                    name="isChecked"
                    checked={isChecked}
                    onChange={handleCheckBox}
                  />
                  <label>Click Checkbox to proceed</label>
                </div>
                <div className="group">
                  <button className="button" disabled={!isChecked}>
                    Track Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    }
    export default Track