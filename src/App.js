import React from 'react';
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom';
import {Register} from './RegisterPage/Register'
import { AdminManagement } from './AdminManagementPage/AdminManagement';
import { ApplicantTest } from './TestPage/ApplicantTest';
import { Navbar } from './Navbar/Navbar';
import { Homepage } from './Homepage/Homepage';

function App() {
  require('dotenv').config();
  return (
<Router>
  <Navbar/>
  <Switch>

    <Route exact path="/">
      <Homepage/>
    </Route>

    <Route exact path="/register">
      <Register/>
    </Route>

    <Route exact path="/admin">
      <AdminManagement/>
    </Route>

    <Route path="/test/:idString">
      <ApplicantTest/>
    </Route>

  </Switch>
</Router>
  );
}

export default App;
