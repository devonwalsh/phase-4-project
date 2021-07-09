import React from 'react'

const Recipients = props => {
    if (props.loggedIn) {
        return (
            <div>
                <h1>Welcome, {props.username}!</h1>
                <h2>Recipients List</h2>
            </div>
        )
    }
    else return (<p>Please log in or sign up.</p>)
}

export default Recipients;