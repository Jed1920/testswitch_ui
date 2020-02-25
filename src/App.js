import React from 'react';
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom';
import './App.css';
import {Register} from './RegisterPage/Register'
import { AdminManagement } from './AdminManagementPage/AdminManagement';

function App() {
  require('dotenv').config();
  return (
<Router>
  <Switch>

    <Route exact path="/">
      <div>Homepage</div>
    </Route>

    <Route exact path="/register">
      <Register/>
    </Route>

    <Route exact path="/admin">
      <AdminManagement/>
    </Route>

  </Switch>
</Router>
  );
}

export default App;
