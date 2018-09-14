import React, { Component } from 'react';
import './App.css';
import Routes from "./routes"
import Header from './components/Header'
import axios from 'axios';

const baseUrl = '/api/customers'


class App extends Component {
  constructor(){
    super()

    this.state = {
      // customers
    }
  }

  componentDidMount(){
    axios.get(`${baseUrl}`).then(res => {
      console.log(res.data)
      this.setState({
        customers: res.data
      })
      })
    }


  render() {
    return (
      <div className="App">
      <Header/>
        {Routes}
      </div>
    );
  }
}

export default App;
