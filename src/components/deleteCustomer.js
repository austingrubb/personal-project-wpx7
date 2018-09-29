import React, { Component } from 'react'
import axios from 'axios'

export class deleteClient extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: this.props.id
        }


    }

    handleChange(key, value){
        this.setState({
         [key]: value
        })
      }

    handleSubmit(event){
        alert('A client was deleted: ' + this.state.name);
        event.preventDefault();
      }

    deleteOneClient(e){
        e.preventDefault();
        console.log('delete was hit')
        axios.delete(`/api/customer?id=${this.state.email}`,this.state).then(res => {
          console.log(res.data)
          this.setState({
            state: res.data
          }, this.handleSubmit(e)
        )
        this.props.function()
        }).catch( err => {
          console.log(err)
        } );
      }



  render() {
    return (
      <div className="deleteClientById">
        <button onClick={(e) => this.deleteOneClient(e)}>delete</button>
      </div>
    )
  }
}

export default deleteClient