import React, { Component } from 'react';

class Signup extends Component {

    state = {
        name: '',
        password: '',
        password_confirmation: ''
    }

    handleSubmit = (e) =>  {
        e.preventDefault()
        fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: this.state.name,
                password: this.state.password,
                password_confirmation: this.state.password_confirmation
            })
        })
        .then(res => res.json())
        .then(data => console.log(data))
    }
    
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Name</label>
                    <input type="text" id="name" value={this.state.name} onChange={e => this.setState({ name: e.target.value})}/>
                    <br/>
                    <label>Password</label>
                    <input type="text" id="password" value={this.state.password} onChange={e => this.setState({ password: e.target.value})}/>
                    <br/>
                    <label>Confirm Password</label>
                    <input type="text" id="password_confirmation" value={this.state.password_confirmation} onChange={e => this.setState({ password_confirmation: e.target.value})}/>
                    <input type="submit"/>
                </form>
            </div>
        )
    }
}

export default Signup;