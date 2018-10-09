import React, { Component } from 'react'
import axios from 'axios'

export class upDateDate extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: this.props.email || '',
            appointment_date: ''
        }


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

    upDateApp(e){
        e.preventDefault();
        console.log('upDateDate was hit')
        axios.post(`/api/customer/date?id=${this.state.email}`,this.state).then(res => {
          console.log('was hot', res.data)
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
      Email:
         <input type='text' value={this.state.email} onChange={ e => this.handleChange('email', e.target.value)}/>
      Appointment date:
         <input type='text' value={this.state.appointment_date} onChange={ e => this.handleChange('appointment_date', e.target.value)}/>
        <button onClick={(e) => this.upDateApp(e)}>change app date </button>
      </div>
    )
  }
}

export default upDateDate