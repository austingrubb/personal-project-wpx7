import React from 'react';
import {Switch, Route} from 'react-router-dom';
import CreateClient from './components/CreateClient'
import Login from './components/Login'
import  Customers  from './components/Customers';
import CreateHorse from './components/CreateHorse';

export default 
<Switch>
   <Route path='/login-signup' component={Login}/>
   <Route path='/customers' component={Customers}/>
   <Route path='/createclient' component={CreateClient}/>
   <Route path='/createhorse' component={CreateHorse}/>
</Switch>