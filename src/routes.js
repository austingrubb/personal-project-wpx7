import React from 'react';
import {Switch, Route} from 'react-router-dom';
import CreateClient from './components/CreateClient'
import Login from './components/Login'
import { Customers } from './components/Customers';

export default 
<Switch>
   <Route path='/login-signup' component={Login}/>
   <Route path='/customers' component={Customers}/>
   <Route exact path='/createclient' component={CreateClient}/>
</Switch>