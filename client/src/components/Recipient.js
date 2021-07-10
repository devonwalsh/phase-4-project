import React, { Component } from 'react';

class Recipient extends Component {
    fetchRecipient = () => {
        fetch(`/recipients/${this.props.match.params.recipientId}`)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))
    }

    componentDidMount() {
        this.fetchRecipient()
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default Recipient;