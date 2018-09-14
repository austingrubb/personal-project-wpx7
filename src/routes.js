import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './components/Home'
import Login from './components/Login'

export default 
<Switch>
   <Route path='/login-signup' component={Login}/>
   <Route exact path='/' component={Home}/>
</Switch>