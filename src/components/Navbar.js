import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './NavBar.css';
import axios from 'axios';
import {addUser} from '../ducks/reducer'
import { connect } from 'react-redux';

export class Navbar extends Component {
  componentDidMount = () => {
    axios.get('/user/sessions').then( (res) => 
    res.data !== "no user loggedin" && this.props.addUser({users: res.data})
    )
  }
  
  render() {
    return (
      <nav className='navbar'>
        <Link to='/createclient'>Create Client</Link>
        <Link to='/createhorse'>Create Horse</Link>
        <Link to='/customers'>Customers</Link>
        <Link to='/login-signup'>Login/Logout</Link>
      </nav>
    )
  }
}

export default connect(null,{addUser})(Navbar);
