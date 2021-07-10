import React, { Component } from 'react';

class Login extends Component {

    state = {
        name: '',
        password: ''
    }

    handleSubmit = (e) =>  {
        e.preventDefault()
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: this.state.name,
                password: this.state.password
            })
        })
        .then(res => res.json())
        .then(data => data.id ? this.props.manageLogin(data.name) : console.log("Wrong username or password"))
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
                    <input type="submit"/>
                </form>
            </div>
        )
    }
}

export default Login;