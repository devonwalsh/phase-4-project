import React, { Component } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

class Recipient extends Component {

    state = {
        recipient: {},
        gifts: [],
        loading: true,
        addGiftFormOpen: false,
        newGiftName: '',
        newGiftPrice: '',
        newGiftLink: ''
    }

    fetchRecipient = () => {
        fetch(`/recipients/${this.props.match.params.recipientId}`)
        .then(res => res.json())
        .then(data => this.setState({...this.state, recipient: data, gifts: data.gifts}))
        .then(this.setState({...this.state, loading: false}))
        .catch(error => console.log(error))
    }

    fetchGifts = () => {
        fetch(`/recipients/${this.props.match.params.recipientId}/gifts`)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))
    }

    createGift = (e) => {
        e.preventDefault()
        fetch(`/recipients/${this.props.match.params.recipientId}/gifts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: this.state.newGiftName,
                price: this.state.newGiftPrice,
                url: this.state.newGiftLink
            })
        })
        .then(res => res.json())
        .then(data => this.setState({...this.state, gifts: [...this.state.gifts, data]}))
        .catch(error => console.log(error))

        this.toggleAddGiftForm();
    }

    updateGift = () => {
        fetch("/recipients/1/gifts/1", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: "Yarn",
                price: 10.99,
                url: ""
            })
        })
    }

    deleteGift = () => {
        fetch("/recipients/1/gifts/3", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    toggleAddGiftForm = () => {
        this.setState({...this.state, addGiftFormOpen: !this.state.addGiftFormOpen})
    }

    componentDidMount() {
        this.fetchRecipient()
    }

    render() {
        if (this.props.loggedIn) {
            if (this.state.loading === false) {
                return (
                    <div>
                        <h1>{this.state.recipient.name}</h1>
                        <h3>Likes: {this.state.recipient.likes}</h3>
                        <h3>Birthday: {this.state.recipient.birthday}</h3>
                        {this.state.addGiftFormOpen ? 
                            <form onSubmit={this.createGift}>
                                <label>Name</label>
                                <input type="text" id="name" value={this.state.newGiftName} onChange={e => this.setState({ ...this.state, newGiftName: e.target.value})}/>
                                <br/>
                                <label>Price</label>
                                <input type="integer" id="price" value={this.state.newGiftPrice} onChange={e => this.setState({ ...this.state, newGiftPrice: e.target.value})}/>
                                <br/>
                                <label>Link</label>
                                <input type="text" id="link" value={this.state.newGiftLink} onChange={e => this.setState({ ...this.state, newGiftLink: e.target.value})}/>
                                <input type="submit"/>
                            </form> : 
                            <button onClick={() => this.toggleAddGiftForm()}>Add Gift</button>
                        }
                        {this.state.gifts.map((item, key) => <p key={key} id={item.id}>{item.name}</p>)}
                        <button onClick={() => this.updateGift()}>Update Test</button>
                        <button onClick={() => this.deleteGift()}>Delete Test</button>
                    </div>
                )
            }
            else {
                return (
                    <div className="spinner">
                       <Dimmer active inverted size="massive">
                          <Loader inverted>Loading...</Loader>
                       </Dimmer>
                    </div>
                )
            }
        }
        else return (<p>Please log in or sign up.</p>)
    }
}

export default Recipient;