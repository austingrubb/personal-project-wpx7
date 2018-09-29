import React, { Component } from 'react'
import axios from 'axios';
import {connect} from 'react-redux';
import CreateHorse from './CreateHorse'
import { Link } from 'react-router-dom';
import UpDateTime from './upDateTime'; 
import UpDateDate from './upDateDate';
import DeleteClient from './deleteCustomer';

const baseUrl = '/api/customers'

class Customers extends Component {
    constructor(){
        super()
    
        this.state = {
          customers:[],
          horses:[],
          value:'',
          showHorses: -1,
          createHorse: -1,
          appointment_time: -1,
          appointment_date: -1,
          show_clients: -1
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

        toggleHorse = (customer, key) => {
          this.state[key] === customer.id ?
            this.setState({
              [key]: -1
            })
          :
            this.setState({
              [key]: customer.id
            })
        }

        inputSearch = (value) => {
          this.setState({
              value
          })
      }

      getHorses(){
        console.log('getHorses was hit ')
        axios.get(`/api/horses`).then(res => {
          console.log(res.data)
          this.setState({
            horses: res.data,
            createHorse: -1
          }
        )
        }).catch( err => {
          console.log(err)
        } );
      } 

      gitNewTime(){
        console.log('upDateApp was hit')
        axios.get(`${baseUrl}`).then(res => {
          console.log(res.data)
          this.setState({
            customers: res.data,
            appointment_time: -1
          }
        )
        }).catch( err => {
          console.log(err)
        } );
      }
    
      gitNewDate(){
        console.log('upDateApp was hit')
        axios.get(`${baseUrl}`).then(res => {
          console.log(res.data)
          this.setState({
            customers: res.data,
            appointment_date: -1
          }
        )
        }).catch( err => {
          console.log(err)
        } );
      }

      gitNewClientList(){
        console.log('deleteOneClient was hit')
        axios.get(`${baseUrl}`).then(res => {
          console.log(res.data)
          this.setState({
            customers: res.data,
            show_clients: -1
          }
        )
        }).catch( err => {
          console.log(err)
        } );
      }     

      
  render() {
    console.log(this.state)
    const renderCustomer = (customer, i) => {
      return <div key={i}>
                <div onClick={() => this.toggleHorse(customer, 'showHorses')}>
                {customer.name }
                </div>
                {this.state.showHorses === customer.id &&
                <div> 
                  <div>{this.state.horses.filter(e =>
                   e.customer_email === customer.email).map(e => e.name)}
                  </div>
                   <button onClick={() => this.toggleHorse(customer, 'createHorse')}>{this.state.createHorse === customer.id ? 'cancel' : 'Add a new Horse'}</button>
                   <button onClick={() => this.toggleHorse(customer, 'appointment_time')}>
                      {this.state.appointment_time === customer.id ? 'cancel' : 'Up Date Appointment Time'}
                   </button>
                   <button onClick={() => this.toggleHorse(customer, 'appointment_date')}>
                      {this.state.appointment_date === customer.id ? 'cancel' : 'Up Date Appointment date'}
                   </button>
                   {/* <button onClick={() => this.toggleHorse(customer, 'show_clients')}>
                      {this.state.show_clients === customer.id ? 'cancel' : 'delete'}
                   </button> */}
                   <DeleteClient id={customer.email} function={this.gitNewClientList.bind(this)}/>
                   </div>
                }
                {this.state.createHorse === customer.id && 
                  <div>
                    <CreateHorse email={customer.email} getHorses={this.getHorses.bind(this)}/>

                  </div>
                }
                {this.state.appointment_time === customer.id &&
                  <div>
                    <UpDateTime email={customer.email} getHorses={this.gitNewTime.bind(this)}/>
                  </div>
                }
                {this.state.appointment_date === customer.id &&
                  <div>
                    <UpDateDate email={customer.email} getHorses={this.gitNewDate.bind(this)}/>
                  </div>
                }
                {this.state.customers === customer.id &&
                  <div>
                    <DeleteClient id={customer.id} getHorses={this.gitNewClientList.bind(this)}/>
                  </div>
                }
                
              </div>
  }
    const mappedCustomers = this.state.customers.length && !this.state.value
     ? 
     this.state.customers.map(renderCustomer) 
    : 
    this.state.value
    ? 
    
        this.state.customers.filter((customer) => customer.name.includes(this.state.value)).map(renderCustomer)
      :
    'loading'
    return (
      <div>
        <div className='searchBar'>
                    <input placeholder='find client' type="text" value={this.state.value} onChange={e => this.inputSearch(e.target.value)}/>
                    {this.props.user ? mappedCustomers : 'please log in'}
                </div>
                <div>
                  <button><Link to='/createclient'>Add New Client</Link></button>
                </div>
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
