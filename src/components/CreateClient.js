import React, { Component } from 'react'
import axios from 'axios'

const baseUrl = '/api/customer'

export class CreateClient extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      address: '',
      zip_code: '',
      cellphone: '',
      email: '',
      customer_type: '',
      appointment_date: '',
      appointment_time: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addNewClient = this.addNewClient.bind(this);
  }

  handleChange(key, value){
    this.setState({
     [key]: value
    })
  }

  handleSubmit(event){
    alert('A client was submitted: ' + this.state.name);
    event.preventDefault();
  }
  
  addNewClient(e){
    e.preventDefault();
    console.log('hit')
    axios.post(`${baseUrl}`,this.state).then(res => {
      console.log(res.data)
      this.setState({
        state: res.data
      }, this.handleSubmit(e),
      this.props.history.push('/customers')
    )
    }).catch( err => {
      console.log(err)
    } );
  } 

  render() {
    // console.log(this.state)
    return (
      <div className='createClientForm'>
        <form >
          <label>
              Name:
            <input type='text' value={this.state.name} onChange={ e => this.handleChange('name', e.target.value)}/>
              Address:
            <input type='text' value={this.state.address} onChange={ e => this.handleChange('address', e.target.value)}/>
              Zip-Code:
            <input type='text' value={this.state.zip_code} onChange={e => this.handleChange('zip_code', e.target.value)}/>
              Cell Phone:
            <input type='text' value={this.state.cellphone} onChange={e =>this.handleChange('cellphone', e.target.value)}/>
              Email:
            <input type='text' value={this.state.email} onChange={e => this.handleChange('email', e.target.value)}/>
              Customer type:
            <input type='text' value={this.state.customer_type} onChange={e => this.handleChange('customer_type', e.target.value)}/>
              Appointment date:
            <input type='text' value={this.state.appointment_date} onChange={e => this.handleChange('appointment_date', e.target.value)}/>
              Appointment time:
            <input type='text' value={this.state.appointment_time} onChange={e => this.handleChange('appointment_time', e.target.value)}/>
          </label>
          <input type="submit" value="Submit" onClick={(e) => this.addNewClient(e)} />
        </form>
      </div>
    )
  }
}

export default CreateClient

