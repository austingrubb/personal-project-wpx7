import React, { Component } from 'react';
import axios from 'axios';


class Login extends Component {
    state = {
      users: null,
      showRegister: false,
      message: null,
    };
  
    getMessage = error => error.response
    ? error.response.data
       ? error.response.data.message
       : JSON.stringify(error.response.data, null, 2)
    : error.message; 
  
    signup = () => {
      this.setState({message: null})
      const username = this.refs.username.value;
      const password = this.refs.password.value;
      axios.post('/signup' , {
        username,
        password
      }).then(response => {
        this.setState({users: response.data}, this.props.history.push('/customers'))
      }).catch(error => {
        this.setState({ message: 'Something went wrong: ' + this.getMessage(error) });
      });
    }
  
    login = () => {
      this.setState({message: null})
      const username = this.refs.username.value;
      const password = this.refs.password.value;
      axios.post('/login', {
        username,
        password
      }).then(response => {
        this.setState({users: response.data}, this.props.history.push('/customers'))
      }).catch(error => {
        this.setState({ message: 'Something went wrong: ' + this.getMessage(error) });
      });
    }
  
    logout = () => {
      axios.post('/logout').then(response => {
        this.setState({ users: null });
      }).catch(error => {
        this.setState({ message: 'Something went wrong: ' + this.getMessage(error) });
      });
    };
  
    render() {
      const { users, showRegister, message} = this.state;
      const userData = JSON.stringify(users, null, 2)
      const inputFields = <div>
        Username: <input ref="username" />
        {' '}
        Password: <input type="password" ref="password" />
        {' '}
        </div>
      return (
        <div className="App">
        <div className="App-intro">
           <nav className="navBar">
            {!users && <div>
              <div className="login_signuplink">
                  <a href="javascript:void(0)" onClick={() => this.setState({ showRegister: false })}>Login</a>
                  {' '}
                  <a href="javascript:void(0)" onClick={() => this.setState({ showRegister: true })}>signup</a>
              </div>
              <div className="login-or-register">
                {showRegister && <div>
                  <h2>sign up</h2>
                  {inputFields}
                  <button onClick={this.signup}>sign up</button>
                </div>}
                {!showRegister && <div>
                  <h2>Log in</h2>
                  {inputFields}
                  <button onClick={this.login}>Log in</button>
                </div>}
                {message}
              </div>
            </div>}
           </nav>
            {users && <div className="user-info">
              <h2>user Data:</h2>
              <div>{ userData }</div>
              <button onClick={this.logout}>Log out</button>
            </div>} 
          </div>
        </div>
      );
    }
  }
  
  export default Login;