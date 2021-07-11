import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

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
        .then(data => data.id ? this.props.manageLogin(data.name) : console.log("Wrong username or password"))
    }
    
    render() {
        return (
            <div className="login-signup-div">
                <Form onSubmit={this.handleSubmit}>
                    <label>Name</label>
                    <input type="text" id="name" value={this.state.name} onChange={e => this.setState({ name: e.target.value})}/>
                    <br/>
                    <label>Password</label>
                    <input type="text" id="password" value={this.state.password} onChange={e => this.setState({ password: e.target.value})}/>
                    <br/>
                    <label>Confirm Password</label>
                    <input type="text" id="password_confirmation" value={this.state.password_confirmation} onChange={e => this.setState({ password_confirmation: e.target.value})}/>
                    <input class="ui button submit-button" type="submit"/>
                </Form>
            </div>
        )
    }
}

export default Signup;