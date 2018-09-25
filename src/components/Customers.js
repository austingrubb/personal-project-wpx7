import React, { Component } from 'react'
import axios from 'axios';
import {connect} from 'react-redux';


const baseUrl = '/api/customers'

class Customers extends Component {
    constructor(){
        super()
    
        this.state = {
          customers:[] 
        }
      }

      componentDidMount(){
        axios.get(`${baseUrl}`).then(res => {
            console.log(res.data)
          this.setState({
              customers: res.data
          })
          }).catch( err => console.log( 'error in component did mount'))
        }
  render() {
    const mappedCustomers = this.state.customers.map((customer, index) => {
        return <div key={index}>
                  <div>{customer.name}</div>
                  <div>{customer.address}</div>
                </div>
      })
    return (
      <div>
        {this.props.user ? mappedCustomers : 'please log in'}
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return{
    user: store.users
  }
}

export default connect(mapStateToProps)(Customers)
