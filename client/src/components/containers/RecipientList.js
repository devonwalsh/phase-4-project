import React, { Component } from 'react'

class RecipientList extends Component{

    createRecipient = () => {
        fetch("/recipients", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: "Mom",
                likes: "knitting",
                birthday: "1956-03-20"
            })
        })
    }

    render() {
        if (this.props.loggedIn) {
            return (
                <div>
                    <h1>Welcome, {this.props.username}!</h1>
                    <h2>Recipients List</h2>
                    <button onClick={() => this.createRecipient()}>Create Test</button>
                </div>
            )
        }
        else return (<p>Please log in or sign up.</p>)
    }
}

export default RecipientList;