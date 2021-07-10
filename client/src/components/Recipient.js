import React, { Component } from 'react';

class Recipient extends Component {
    fetchRecipient = () => {
        fetch(`/recipients/${this.props.match.params.recipientId}`)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))
    }

    fetchGifts = () => {
        fetch(`/recipients/${this.props.match.params.recipientId}/gifts`)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))
    }

    createGift = () => {
        fetch(`/recipients/${this.props.match.params.recipientId}/gifts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: "Yarn",
                price: 10.99,
                url: ""
            })
        })
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
                <button onClick={() => this.fetchGifts()}>Fetch Test</button>
                <button onClick={() => this.createGift()}>Create Test</button>
            </div>
        )
    }
}

export default Recipient;