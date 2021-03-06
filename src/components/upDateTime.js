import React, { Component } from 'react'
import axios from 'axios'

export class upDateTime extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: this.props.email || '',
            appointment_time: ''
        }
        // this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.upDateAppointmentTime = this.upDateAppointmentTime.bind(this);
    }

    handleChange(key, value){
        this.setState({
         [key]: value
        })
      }

    handleSubmit(event){
        alert('A app time was submitted: ' + this.state.name);
        event.preventDefault();
      }

    upDateAppointmentTime(e){
        e.preventDefault();
        console.log('upDateApp was hit')
        axios.post(`/api/customer/time?id=${this.state.email}`,this.state).then(res => {
          console.log(res.data)
          this.setState({
            state: res.data
          }, this.handleSubmit(e)
        )
        }).catch( err => {
          console.log(err)
        } );
      }



  render() {
    return (
      <div className="upDate">
        <form>
          <label>
            Email:
              <input type='text' value={this.state.email} onChange={ e => this.handleChange('email', e.target.value)}/>
            Appointment Time:
              <input type='text' value={this.state.appointment_time} onChange={ e => this.handleChange('appointment_time', e.target.value)}/>
          </label>
              <input type="submit" value="Submit" onClick={(e) => this.upDateAppointmentTime(e)} />
        </form>
      </div>
    )
  }
}

export default upDateTime
