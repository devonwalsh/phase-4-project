import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';

class RecipientList extends Component{

    state = {
        recipients: []
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
        fetch("/recipients/2", {
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

    componentDidMount() {
        this.getRecipients()
    }

    render() {
        if (this.props.loggedIn) {
            return (
                <div>
                    <h1>Welcome, {this.props.username}!</h1>
                    <h2>Recipients List</h2>
                    {this.state.recipients.map((item, key) => <NavLink key={key} exact to={`/recipientlist/${item.id}`}>{item.name}</NavLink>)}
                    <button onClick={() => this.createRecipient()}>Create Test</button>
                    <button onClick={() => this.updateRecipient()}>Update Test</button>
                </div>
            )
        }
        else return (<p>Please log in or sign up.</p>)
    }
}

export default RecipientList;