import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

class RecipientList extends Component{

    state = {
        recipients: [],
        addRecipientFormOpen: false,
        newRecipientName: '',
        newRecipientLikes: '',
        newRecipientBirthday: ''
    }

    getRecipients = () => {
        fetch("/recipients")
        .then(res => res.json())
        .then(data => this.setState({...this.state, recipients: data}))
    }

    createRecipient = () => {
        fetch("/recipients", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: "Bob",
                likes: "cars",
                birthday: "1980-05-14"
            })
        })
    }

    updateRecipient = () => {
        fetch("/recipients/3", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: "Jim",
                likes: "planes",
                birthday: "1974-08-07"
            })
        })
    }

    toggleAddRecipientForm = () => {
        this.setState({...this.state, addRecipientFormOpen: !this.state.addRecipientFormOpen})
    }

    addRecipient = (e) =>  {
        e.preventDefault()
        fetch("/recipients", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: this.state.newRecipientName,
                likes: this.state.newRecipientLikes,
                birthday: this.state.newRecipientBirthday
            })
        })
        .then(res => res.json())
        .then(data => this.setState({...this.state, recipients: [...this.state.recipients, data]}))

        this.toggleAddRecipientForm();
    }

        
    deleteRecipient = recipientId => {
        fetch(`/recipients/${recipientId}`, {
            method: "DELETE"
        })
        .then(res => res.json())
        .then(this.removeRecipientFromState(recipientId))
        .catch(error => console.log(error))
    }

    removeRecipientFromState = recipientId => {
        let updatedState = this.state.recipients.filter(
          item => item.id !== recipientId
        )
    
        this.setState({...this.state, recipients: updatedState})
    }

    componentDidMount() {
        this.getRecipients()
    }

    render() {
        if (this.props.loggedIn) {
            return (
                <Container className="recipient-list">
                    <h1>Welcome, {this.props.username}!</h1>
                    <h2>Recipients List</h2>
                    {this.state.addRecipientFormOpen ? 
                        <form onSubmit={this.addRecipient}>
                            <label>Name</label>
                            <input type="text" id="name" value={this.state.newRecipientName} onChange={e => this.setState({ ...this.state, newRecipientName: e.target.value})}/>
                            <br/>
                            <label>Likes</label>
                            <input type="text" id="likes" value={this.state.newRecipientLikes} onChange={e => this.setState({ ...this.state, newRecipientLikes: e.target.value})}/>
                            <br/>
                            <label>Birthday</label>
                            <input type="date" id="birthday" value={this.state.newRecipientBirthday} onChange={e => this.setState({ ...this.state, newRecipientBirthday: e.target.value})}/>
                            <input type="submit"/>
                        </form> : 
                        <button onClick={() => this.toggleAddRecipientForm()}>Add Giftee</button>
                    }
                    {this.state.recipients.map((item, key) => <p key={key} id={item}><NavLink exact to={`/recipientlist/${item.id}`}>{item.name}</NavLink><button onClick={() => this.deleteRecipient(item.id)}>Delete</button></p>)}
                    <button onClick={() => this.updateRecipient()}>Update Test</button>
                </Container>
            )
        }
        else return (<p>Please log in or sign up.</p>)
    }
}

export default RecipientList;