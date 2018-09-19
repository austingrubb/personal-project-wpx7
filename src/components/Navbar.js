import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './NavBar.css';

export class Navbar extends Component {
  render() {
    return (
      <nav className='navbar'>
        <Link to='/createclient'>Create Client</Link>
        <Link to='/customers'>Customers</Link>
        <Link to='/login-signup'>Login/Logout</Link>
      </nav>
    )
  }
}

export default Navbar
