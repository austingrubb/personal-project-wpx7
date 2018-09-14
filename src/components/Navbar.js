import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export class Navbar extends Component {
  render() {
    return (
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/login-signup'>Login</Link>
      </nav>
    )
  }
}

export default Navbar
