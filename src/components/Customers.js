import React, { Component } from 'react'
import axios from 'axios';
import {connect} from 'react-redux';
import CreateHorse from './CreateHorse'
import { Link } from 'react-router-dom';
import UpDateTime from './upDateTime'; 
import UpDateDate from './upDateDate';
import DeleteClient from './deleteCustomer';
import './customer.css';

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
          show_clients: -1,
          horseInfo: ""
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

        

        toggleHorseInfo = (horse, key) => {
          console.log(this.toggleHorseInfo)
          this.state[key] === horse.id ?
            this.setState({
              [key]: -1
            })
          :
            this.setState({
              [key]: horse.id
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

      getHorseData = (id) => {
        axios.get(`/api/horse?id=${id}`).then(res => {
          const horseInfo = {
            id: res.data[0].id,
            appointment_date: res.data[0].appointment_date
          }
          this.setState({
           horseInfo: horseInfo
          })
        })
      }

      
      render() {
        console.log(this.state.appointment_date)
        const renderCustomer = (customer, i, horses) => {
          return <div key={i} className='clientsName'>
                <div onClick={() => this.toggleHorse(customer, 'showHorses')}>
                {customer.name }
                </div>
                {this.state.showHorses === customer.id &&
                <div> 
                  <div>{this.state.horses.filter(e =>
                   e.customer_email === customer.email).map(e => {
                     return <div onClick={() => this.getHorseData(e.id)}>
                              {e.name}
                          <div onClick={() => this.toggleHorse(horses, 'showHorses')}>
                              {this.state.horseInfo && this.state.horseInfo.id === e.id ? <div>{this.state.horseInfo.appointment_date}</div> : !this.state.showHorses}
                            </div>
                              <button onClick={() => this.toggleHorse(horses, 'appointment_time')}>
                                  {this.state.appointment_time === horses.id ? 'cancel' : 'Update Appointment Time'}
                              </button>
                              <button onClick={() => this.gitNewDate(horses, 'appointment_date')}>
                                  {this.state.appointment_date === horses.id ? 'cancel' : 'Update Appointment date'}
                              </button>

                          </div>
                     })}
                  </div >
                   <button onClick={() => this.toggleHorse(customer, 'createHorse')}>{this.state.createHorse === customer.id ? 'cancel' : 'Add a new Horse'}</button>
                    <div onClick={() => this.toggleHorseInfo(customer, 'showHorses')}>
                    </div>
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
                    <UpDateTime id={customer.id} gitNewTime={this.gitNewClientList.bind(this)}/>
                  </div>
                }
                {1 === customer.id &&
                  <div>
                    <UpDateDate id={horses.id} upDateApp={this.gitNewClientList.bind(this)}/>
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



      // gitNewTime(){
      //   console.log('upDateApp was hit')
      //   axios.get(`${baseUrl}`).then(res => {
      //     console.log(res.data)
      //     this.setState({
      //       customers: res.data,
      //       appointment_time: -1
      //     }
      //   )
      //   }).catch( err => {
      //     console.log(err)
      //   } );
      // }
    
      // gitNewDate(){
      //   console.log('upDateApp was hit')
      //   axios.get(`${baseUrl}`).then(res => {
      //     console.log(res.data)
      //     this.setState({
      //       customers: res.data,
      //       appointment_date: -1
      //     }
      //   )
      //   }).catch( err => {
      //     console.log(err)
      //   } );
      // }
