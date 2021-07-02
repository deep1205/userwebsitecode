import React,{useState,useEffect} from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {makeStyles,useTheme } from '@material-ui/core/styles';
import MapContainer from '../sideMapComponent/sideMapComponent'
import driver from './../../images/user.png'
import Collapse from '@material-ui/core/Collapse';
import Fab from '@material-ui/core/Fab';
import Header from './../Myheader/Header'
import Headerwithlogin from "../Myheader/Headerwithlogin";
import axios from 'axios'
import PersonIcon from '@material-ui/icons/Person';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import './custom.style.css'
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    transform:'none',
    transition:'transform 150ms cubicbezier(0.4, 0, 0.2, 1) 0ms',
    scrollbarWidth: 'none'  /* Firefox */,
  },
  drawer: {
    flexShrink: 0,
      border:'None',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  nested: {
    paddingLeft: theme.spacing(2),
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    background: 'seashell',
    [theme.breakpoints.up('1650')]:{
      width:'20%'
    }
  },
  drawerHeading:{
    fontFamily: "'poppins',sans-serif,Times,'Times New Roman',Georgia, serif",
  fontWeight: '550',
  color:'black',
  fontSize:'20px',
  [theme.breakpoints.up('1650')]:{
    fontSize:'1.5rem',
  }
  },
  drawerDetail:{
    fontFamily: "'poppins',sans-serif,Times,'Times New Roman',Georgia, serif",
    fontWeight:'400',
    textAlign:'left',
    paddingRight:'20px',
    color:'black',
    fontSize:'18px',
    [theme.breakpoints.up('1650')]:{
      fontSize:'1.4rem',
    }
  },
  navbar_logo:{
    display:'block',
    width:'150px',
    height:'175px',
    padding:'35px 20px',
    margin:'0px auto',
    borderRadius:'50%',
    [theme.breakpoints.up('1700')]:{
      width:'175px',
      height:'200px'
    }
  },
  drawerButton:{
    width:'30px',
    height:'45px',
    borderRadius:'0',
    [theme.breakpoints.up('1700')]:{
      width:'50px',
      height:'65px'
    }
  }
}));

export default function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [PatientOpen, setPatientOpen] = React.useState(true);
  const handlePatientClick = () => {
    setPatientOpen(!PatientOpen);
  };
  const [HospitalOpen,setHospitalOpen]=React.useState(true);
  const handleHospitalClick=()=>{
    setHospitalOpen(!HospitalOpen)
  }
  const [driverOpen,setDriverOpen]=React.useState(true)
  const handleDriverClick=()=>{
    setDriverOpen(!driverOpen)
  }
  const [userDetails,setUserDetails]=useState({})
  useEffect(() => {
    axios.put('https://server.prioritypulse.co.in/users/activeRideById',{
      rideid:sessionStorage.getItem('rideid')
    })
    .then(response=>{
      const data=response.data
      console.log(data)
      setUserDetails({
            _id:data['_id'],
            pickUplocation:data['pickUplocation'].coordinates,
            name:data['name'],
            pcase:data['pcase'],
            patientNo:data['patientNo'],
            age:data['age'],
            guardianNo:data['guardianNo'],
            pickedBy:data['pickedBy'],
            hospital:data['hospital'],
            patientPolyline:data['patientPolyline'],
            hospitalPolyline:data['hospitalPolyline']
      })
    })
    .catch(err=>{
      console.log(err)
    })
  }, [])

  const drawer = (
    <div>
      <div position='fixed' style={{marginBottom:'1rem',marginTop:'0',backgroundImage: 'linear-gradient(to right, #a116ef, #390999)'}}>
      <img className={classes.navbar_logo} src={driver} alt='Priority Pulse' />
      {/* <a href="#" className={classes.navbar_logo} style={{backgroundImage:{driver},diplay:'block'}}></a> */}

      </div>
      <List>
      <ListItem button onClick={handleDriverClick}>
        {/* <ListItemIcon>
          <PersonIcon />
        </ListItemIcon> */}
        <ListItemText classes={{primary:classes.drawerHeading}} primary="Driver Information">{driverOpen && <div className='active'/>}</ListItemText>
        {driverOpen ? <ArrowDropUpIcon />:<ArrowDropDownIcon /> }
      </ListItem>
      <Collapse in={driverOpen} timeout="auto" unmountOnExit>
        <List component="div">
          <ListItem button className={classes.nested}>
            <ListItemText classes={{primary:classes.drawerDetail}}  primary={userDetails['pickedBy']?userDetails['pickedBy'].name:'Not Available'} />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemText classes={{primary:classes.drawerDetail}}  primary={userDetails['pickedBy']?userDetails['pickedBy'].mobileNo:'Not Available'} />
          </ListItem>
        </List>
      </Collapse>
      </List>
      <Divider />
      <List>
      <ListItem button onClick={handlePatientClick}>
        {/* <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon> */}
        <ListItemText classes={{primary:classes.drawerHeading}} primary="Patient Information" />
        {PatientOpen ? <ArrowDropUpIcon />:<ArrowDropDownIcon />}
      </ListItem>
      <Collapse in={PatientOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemText classes={{primary:classes.drawerDetail}} primary={userDetails.name?userDetails.name:'Not available'} />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemText classes={{primary:classes.drawerDetail}} primary={userDetails.pcase?userDetails.pcase:'Not Available'} />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemText classes={{primary:classes.drawerDetail}} primary={userDetails.age?userDetails.age:'Not Available'} />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemText  classes={{primary:classes.drawerDetail}} primary={userDetails.patientNo?userDetails.patientNo:'Not Available'} />
          </ListItem>
        </List>
      </Collapse>
      </List>
      <Divider />
      <List>
      <ListItem button onClick={handleHospitalClick}>
        {/* <ListItemIcon>
          <LocalHospitalRoundedIcon />
        </ListItemIcon> */}
        <ListItemText classes={{primary:classes.drawerHeading}} primary="Hospital Information" />
        {HospitalOpen ? <ArrowDropUpIcon />:<ArrowDropDownIcon />}
      </ListItem>
      <Collapse in={HospitalOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemText classes={{primary:classes.drawerDetail}} primary={userDetails['hospital']?userDetails['hospital']['name']:'Not Available'} />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemText  classes={{primary:classes.drawerDetail}} primary={userDetails['hospital']?userDetails.hospital['city']:'Not Available'} />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemText  classes={{primary:classes.drawerDetail}} primary={userDetails['hospital']?userDetails.hospital['district']:'Not Available'} />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemText classes={{primary:classes.drawerDetail}}  primary={userDetails['hospital']?userDetails.hospital['hospitalNumbers'][0]:'Not Available'} />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemText  classes={{primary:classes.drawerDetail}} primary={userDetails['hospital']?userDetails.hospital['email']:'Not Available'} />
          </ListItem>
        </List>
      </Collapse>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div>
      {localStorage.getItem("token") == null ? (
        <Header location='token' />
      ) : (
        <Headerwithlogin location='token' />
      )}
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden implementation="css">
          <Drawer
            container={container}
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              root: classes.root,
              paper: classes.drawerPaper,
            }}
            transitionDuration={{ enter: 350, exit: 350 }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main style={{ height: "85vh" }}>
        <Fab
          size="medium"
          aria-label="add"
          color="primary"
          style={{ zIndex: "1000" }}
          classes={{ root: classes.drawerButton }}
          onClick={handleDrawerToggle}
        >
          <ArrowForwardIosIcon size="medium" style={{ color: "white" }} />
        </Fab>
        <MapContainer userDetails={userDetails} />
      </main>
    </div>
  );
}
