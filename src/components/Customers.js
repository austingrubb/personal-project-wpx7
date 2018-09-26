import React, { Component } from 'react'
import axios from 'axios';
import {connect} from 'react-redux';


const baseUrl = '/api/customers'

class Customers extends Component {
    constructor(){
        super()
    
        this.state = {
          customers:[],
          horses:[]
        }
      }

      componentDidMount(){
        axios.get(`${baseUrl}`).then(res => {
          this.setState({
              customers: res.data,
          })
          }).catch( err => console.log( 'error in component did mount', err))

        axios.get(`/api/horses`).then(res => {
          console.log(res.data)
          this.setState({
            horses: res.data
          })
        }).catch( err => console.log( 'error in component did mount', err))
        }

        toggleHorse = (customer) => {
          this.state.showHorses === customer.id ?
            this.setState({
              showHorses: -1
            })
          :
            this.setState({
              showHorses: customer.id
            })
        }
  render() {
    console.log(this.state)
    const mappedCustomers = this.state.customers.map((customer, i) => {
        return <div key={i} onClick={() => this.toggleHorse(customer)}>
                  <div>{customer.name}</div>
                  {this.state.showHorses === customer.id && <div>{this.state.horses.filter(e =>
                     e.customer_email === customer.email).map(e => e.name)}</div>}
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
