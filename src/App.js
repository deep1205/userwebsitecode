import React from 'react'
import { Route, Switch, Redirect } from "react-router-dom";
import Footer from "./Components/Footer"
import Homepage from "./Screens/Homepage";
import TokenPage from "./Screens/TrackAmbulancepage"
import TrackPage from "./Components/trackerComponent/Tracker.component"
import Loginpage from "./Screens/Loginpage";
import Pastridepage from "./Screens/Pastridepage";
import Profile from "./Screens/Profile"
import { GuardProvider, GuardedRoute } from "react-router-guards";
const requireLogin = (to, from, next) => {
  if (to.meta.auth) {
    if (localStorage.getItem("token") != null) {
      next();
    }
    next.redirect("/login");
  } else {
    next();
  }
};
const App = () => {

  return (
    <div>
      <GuardProvider guards={[requireLogin]}>
      <Switch>
        <Route exact path="/home">
          <Homepage />
        </Route>
        <Route exact path="/token">
          <TokenPage />
        </Route>
         <GuardedRoute
            exact path="/pastride"
          
            component={Pastridepage}
            meta={{ auth: true }}
          />
        <Route exact path="/track">
          <TrackPage />
        </Route>
        <Route exact path="/login">
          <Loginpage />
        </Route>

        <Redirect to="/home" />
      </Switch>
      </GuardProvider>
      <Footer />
    </div>
  );
}

export default App
