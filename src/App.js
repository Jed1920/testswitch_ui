import React, { useContext } from 'react';
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom';
import {Register} from './RegisterPage/Register'
import { AdminManagement } from './AdminManagementPage/AdminManagement';
import { ApplicantTest } from './TestPage/ApplicantTest';
import { Navbar } from './Navbar/Navbar';
import { Homepage } from './Homepage/Homepage';
import { AuthContextProvider, AuthContext } from './General/AuthContext';
import { Login } from './LoginPage/Login';

function App() {
  require('dotenv').config();
  
  return (
    <AuthContextProvider>

      <Router>
        <Navbar/>
        <Switch>

          <Route exact path="/">
            <Homepage/>
          </Route>

          <Route exact path="/register">
            <Register/>
          </Route>

          <AuthenticatedPages/>

          <Route path="/test/:idString">
            <ApplicantTest/>
          </Route>

        </Switch>
      </Router>

</AuthContextProvider>
  );
}

export function AuthenticatedPages(){
  const context = useContext(AuthContext);
  console.log(context.token)
  console.log(context.loggedIn)
  console.log(context.token === "")
  if (!context.loggedIn){
    return <Login/>
  }
  return(
          <Route exact path="/admin">
            <AdminManagement/>
          </Route>
  )
}

export default App;
