import React, {useState, useEffect} from "react";
import "./sideMap.styles.css"
import usermarkericon from "./../../images/usericon.png"
import hospitalmarkericon from "./../../images/hospitalicon.png"
import MyLocationIcon from '@material-ui/icons/MyLocation';
import io from 'socket.io-client'
import drivericon from './../../images/drivericon.png'
import decodePolyline from "decode-google-map-polyline";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//class starts
let usermarker,drivermarker,marker,hospitalmarker;
let map;
let usersocket,driversocket

const IndexMap =(props)=> {
  const userendpoi = "https://server.prioritypulse.co.in/usertrack";
  const driverendpoi = "https://server.prioritypulse.co.in/drivertrack";
  const [userLocation,setUserLocation]=useState([])
  const [driverLocation,setDriverLocation]=useState([])

  usersocket=io(userendpoi)
  driversocket=io(driverendpoi)

  useEffect(() => {
    usersocket.emit('join', { roomid:props.userDetails?props.userDetails._id:'' });
		usersocket.on('message', (da) => {
			console.log('user', da);
		});
    usersocket.emit('sendUserLocation', { coordinates:userLocation },console.log('sent',userLocation));
        usersocket.on('userlocation', (coordinates) => {
        console.log('user',coordinates)
      })
  },[userLocation]);

  useEffect(()=>{
    driversocket.emit('join',{roomid:props.userDetails['pickedBy']?props.userDetails['pickedBy']._id:''})
    driversocket.on('message',(da)=>{
      console.log('driver',da)
    })
    driversocket.on('driverlocation',({coordinates})=>{
      console.log('driver',coordinates)
      setDriverLocation(coordinates)
    })
  },[props.userDetails])

    useEffect(()=>{
      var options = { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true };//check if we don't get location in 30 seconds
      var watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);
    },[])

    function onSuccess(pos) {
        setUserLocation([pos.coords.latitude,pos.coords.longitude])
    }
    function onError(error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
  }

  const [patientPolyline,setPatientPolyline]=useState("")
  const [hospitalPolyline,setHospitalPolyline]=useState("")

  useEffect(()=>{
    setPatientPolyline(props.userDetails.patientPolyline);
    setHospitalPolyline(props.userDetails.hospitalPolyline)
    if(map){
      hospitalmarker.setPosition({lat:props.userDetails.hospital.hospitalLocation.coordinates[0],
      lng:props.userDetails.hospital.hospitalLocation.coordinates[1]})
      hospitalmarker.setMap(map)
    }
  },[props.userDetails])

  useEffect(()=>{
    if(map && userLocation.length>0 && typeof(usermarker)!==undefined){
      usermarker.setPosition({lat:userLocation[0],lng:userLocation[1]})
      map.setCenter({lat:userLocation[0],lng:userLocation[1]})
      usermarker.setMap(map)
      console.log('user current location',userLocation)
    }
  },[userLocation])

  useEffect(()=>{
    if(map && driverLocation.length>0){
    drivermarker.setPosition({lat:driverLocation[0],lng:driverLocation[1]})
    drivermarker.setMap(map)
    }
  },[driverLocation])

  function myLocation(){
    // Setup the click event listeners: simply set the map to users current location.
    if(userLocation.length>0){
      marker.setPosition({lat:userLocation[0],lng:userLocation[1]})
      map.panTo({lat:userLocation[0],lng:userLocation[1]})
    }
    // if(driverLocation.length>0){
    //   marker.setPosition({lat:driverLocation[0],lng:driverLocation[1]});
    //   map.panTo({lat:driverLocation[0],lng:driverLocation[1]})
    // }
      
  }
  useEffect(()=>{
    if(map){
      var bounds = new window.google.maps.LatLngBounds();
      var patientCoordinatesArray = decodePolyline(patientPolyline)
      // console.log(patientCoordinatesArray)

      var patientPathCoordinates=patientCoordinatesArray.map((coords)=>{
        // console.log(coords.lat,coords.lng)
        var point=new window.google.maps.LatLng(coords.lat,coords.lng)
        bounds.extend(point)
        return point
      })
      new window.google.maps.Polyline({
        path:patientPathCoordinates,
        geodesic: true,
        strokeColor: "#00000F",
        strokeOpacity: 1.0,
        strokeWeight: 3,
        map
      });
      // map.panTo(patientPathCoordinates[0]);
    }
  },[patientPolyline])

  useEffect(()=>{
    if(map){
      var bounds = new window.google.maps.LatLngBounds();
      var hospitalCoordinatesArray = decodePolyline(hospitalPolyline)
      // console.log(hospitalCoordinatesArray)

      var hospitalPathCoordinates=hospitalCoordinatesArray.map((coords)=>{
        // console.log(coords.lat,coords.lng)
        var point=new window.google.maps.LatLng(coords.lat,coords.lng)
        bounds.extend(point)
        return point
      })
      new window.google.maps.Polyline({
        path:hospitalPathCoordinates,
        geodesic: true,
        strokeColor: "#0000FF",
        strokeOpacity: 1.0,
        strokeWeight: 3,
        map
      }); 
      // map.panTo(hospitalPathCoordinates[0]);
    }
  },[hospitalPolyline])

  
 const initMap = () => {
    map = new window.google.maps.Map(document.getElementById("map"), {
      center:{lat:userLocation[0],lng:userLocation[1]},
        zoom: 15,
        mapTypeControl: false,
        streetViewControl:false,
        fullscreenControl:false,
      });
      
     usermarker=new window.google.maps.Marker({
       icon:{
         url:usermarkericon,
         scaledSize:new window.google.maps.Size(50,50)
       }
     })
     hospitalmarker=new window.google.maps.Marker({
       icon:{
         url:hospitalmarkericon,
         scaledSize:new window.google.maps.Size(50,50)
       }
     })
     drivermarker=new window.google.maps.Marker({
       icon:{
         url:drivericon,
         scaledSize:new window.google.maps.Size(50,50)
      }
    })

    marker=new window.google.maps.Marker()
  };
  useEffect(()=>{
   if(map && props.userDetails.pickUplocation){
    map.setCenter({lat:props.userDetails.pickUplocation[0],lng:props.userDetails.pickUplocation[1]})
   } 
  },[props.userDetails])

  const renderMap = () => {
    loadScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyATwnp3e3ZL7__Oskpdo8Gutgls6ir4FeU&libraries=geometry&callback=initMap"
    );
    window.initMap = initMap;
  }
  useEffect(()=>{
    renderMap()
  },[])
    return (
      <main>
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
        <div className="mapbutton">
          <button onClick={(e) => myLocation()} className="myLocationBtn">
            <MyLocationIcon style={{ color: "#960A0A"}} />
          </button>
          </div>
        <div id="map" className="map"></div>
      </main>
    );
}

function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}
export default IndexMap;