import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
/*
  Public pages
 */
import Login          from 'Pages/LoginPage/LoginPage';
import LostPassword   from 'Pages/LostPasswordPage/LostPasswordPage';
import FormConnection from 'Pages/FormConnection/FormConnection';
import Authentificate from 'Pages/Authentificate/Authentificate';
import ProfilPage     from 'Pages/ProfilPage/ProfilPage';
import ProfileUser    from 'Pages/ProfilUser/ProfilUser';
import About          from 'Pages/About/About';
import Admin          from 'Pages/Admin/Admin';

/*
  Private pages
 */


import {
  LOGIN_PAGE_PATH,
  LOST_PASSWORD_PATH,
  FORM_CONNECTION_PATH,
  AUTHENTIFICATE_PATH,
  PROFIL_PAGE,
  PROFIL_USER,
  ABOUT_PATH,
  ADMIN_PATH
} from './Paths.js';

const isLogged = localStorage.getItem;

const Routes = ({logged, user}) => (
  !logged ?
    /*
      Public pages
     */
    <Router>
      <Switch>
        <Route path={FORM_CONNECTION_PATH} component={FormConnection} />  
        <Route path={ABOUT_PATH}           component={About} />
        <Route path={LOST_PASSWORD_PATH}   component={LostPassword} />
        <Route path={AUTHENTIFICATE_PATH}  component={Authentificate} />
        <Route path={LOGIN_PAGE_PATH}      component={Login} />
        <Route                             component={Login} />
      </Switch>
    </Router> :
    /*
    Private pages
    */
    user.role === "admin" && logged ?
   <Router>
      <Switch>
        <Route path={`${PROFIL_USER}/:id`} component={ProfileUser} />
        <Route path={PROFIL_PAGE}          component={ProfilPage} />
        <Route path={ABOUT_PATH}           component={About} />
        <Route path={ADMIN_PATH}           component={Admin} />
        <Route                             component={ProfilPage} />
      </Switch>
    </Router> :
    <Router>
      <Switch>
        <Route path={`${PROFIL_USER}/:id`} component={ProfileUser} />
        <Route path={PROFIL_PAGE}          component={ProfilPage} />
        <Route path={ABOUT_PATH}           component={About} />
        <Route                             component={ProfilPage} />
      </Switch>
    </Router>
);

export default connect(
  state => ({
    logged : localStorage.getItem('token'),
    user   : state.user
  })
)(Routes);