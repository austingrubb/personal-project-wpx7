import React, { Component } from 'react'
import axios from 'axios'

const baseUrl = '/api/horse'

export class CreateHorse extends Component {
  constructor(props){
    super(props)
    this.state = {
      customer_email: this.props.email || '',
      name: '',
      age: '',
      breed: '',
      height: '',
      sex: '',
      foaling_year: '',
      color: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addNewHorse = this.addNewHorse.bind(this);
  }

  handleChange(key, value){
    this.setState({
     [key]: value
    })
  }

  handleSubmit(event){
    alert('A horse was submitted: ' + this.state.name);
    event.preventDefault();
  }
  
  addNewHorse(e){
    e.preventDefault();
    console.log('addnew horse was hit')
    axios.post(`${baseUrl}`,this.state).then(res => {
      console.log(res.data)
      this.setState({
        state: res.data
      }, this.handleSubmit(e),
      this.props.getHorses()
    )
    }).catch( err => {
      console.log(err)
    } );
  } 

  render() {
    console.log(this.props)
    return (
      <div className='createHorseForm'>
        <form >
          <label>
              Customer_email:
            <input type='text' value={this.state.customer_email} onChange={ e => this.handleChange('customer_email', e.target.value)}/>
              Name:
            <input type='text' value={this.state.name} onChange={ e => this.handleChange('name', e.target.value)}/>
              Age:
            <input type='text' value={this.state.age} onChange={e => this.handleChange('age', e.target.value)}/>
              Breed:
            <input type='text' value={this.state.breed} onChange={e =>this.handleChange('breed', e.target.value)}/>
              Height:
            <input type='text' value={this.state.height} onChange={e => this.handleChange('height', e.target.value)}/>
              Sex:
            <input type='text' value={this.state.sex} onChange={e => this.handleChange('sex', e.target.value)}/>
              Foaling_year:
            <input type='text' value={this.state.foaling_year} onChange={e => this.handleChange('foaling_year', e.target.value)}/>
              Color:
            <input type='text' value={this.state.color} onChange={e => this.handleChange('color', e.target.value)}/>
          </label>
          <input type="submit" value="Submit" onClick={(e) => this.addNewHorse(e)} />
        </form>
      </div>
    )
  }
}

export default CreateHorse