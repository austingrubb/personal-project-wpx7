import React, { Component } from 'react'
import axios from 'axios';

const baseUrl = '/api/customers'

export class Customers extends Component {
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
      console.log(this.state.customers)
    const mappedCustomers = this.state.customers.map((customer, index) => {
        return <div key={index}>
                  <div>{customer.name}</div>
                  <div>{customer.address}</div>
                </div>
      })
    return (
      <div>
        {mappedCustomers}
      </div>
    )
  }
}

export default Customers
