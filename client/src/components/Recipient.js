import React, { Component } from 'react';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';

class Recipient extends Component {

    state = {
        recipientName: '',
        recipientLikes: '',
        recipientBirthday: '',
        gifts: [],
        loading: true,
        addGiftFormOpen: false,
        newGiftName: '',
        newGiftPrice: '',
        newGiftLink: '',
        editRecipientFormOpen: false,
        editGiftName: '',
        editGiftPrice: '',
        editGiftLink: '',
    }

    fetchRecipient = () => {
        fetch(`/recipients/${this.props.match.params.recipientId}`)
        .then(res => res.json())
        .then(data => this.setState({...this.state, recipientName: data.name, recipientLikes: data.likes, recipientBirthday: data.birthday, gifts: data.gifts, loading: false}))
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
        .then(data => this.setState({...this.state, gifts: [...this.state.gifts, data], newGiftName: '', newGiftPrice: '', newGiftLink: '', addGiftFormOpen: false}))
        .catch(error => console.log(error))
    }

    deleteGift = giftId => {
        fetch(`/recipients/${this.props.match.params.recipientId}/gifts/${giftId}`, {
            method: "DELETE"
        })
        .then(this.removeGiftFromState(giftId))
        .catch(error => console.log(error))
    }

    removeGiftFromState = giftId => {
        let updatedState = this.state.gifts.filter(
          item => item.id !== giftId
        )
    
        this.setState({...this.state, gifts: updatedState})
    }

    toggleAddGiftForm = () => {
        this.setState({...this.state, addGiftFormOpen: !this.state.addGiftFormOpen})
    }

    toggleEditRecipientForm = () => {
        this.setState({...this.state, editRecipientFormOpen: !this.state.editRecipientFormOpen})
    }

    editRecipient = (e) => {
        e.preventDefault();
        fetch(`/recipients/${this.props.match.params.recipientId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: this.state.recipientName,
                likes: this.state.recipientLikes,
                birthday: this.state.recipientBirthday
            })
        })
        .then(res => res.json())
        .then(data => this.setState({...this.state, recipientName: data.name, recipientLikes: data.likes, recipientBirthday: data.birthday, editRecipientFormOpen: false}))
    }

    componentDidMount() {
        this.fetchRecipient()
    }

    render() {
        if (this.props.loggedIn) {
            if (this.state.loading === false) {
                return (
                    <div>
                        {this.state.editRecipientFormOpen ? 
                        <form onSubmit={this.editRecipient}>
                        <label>Name</label>
                        <input type="text" id="name" value={this.state.recipientName} onChange={e => this.setState({ ...this.state, recipientName: e.target.value})}/>
                        <br/>
                        <label>Likes</label>
                        <input type="text" id="likes" value={this.state.recipientLikes} onChange={e => this.setState({ ...this.state, recipientLikes: e.target.value})}/>
                        <br/>
                        <label>Birthday</label>
                        <input type="date" id="birthday" value={this.state.recipientBirthday} onChange={e => this.setState({ ...this.state, recipientBirthday: e.target.value})}/>
                        <input type="submit"/>
                    </form>
                        :
                        <div>
                            <h1>{this.state.recipientName}</h1>
                            <h3>Likes: {this.state.recipientLikes}</h3>
                            <h3>Birthday: {this.state.recipientBirthday}</h3>
                            <button onClick={() => this.toggleEditRecipientForm()}>Edit Giftee</button>
                        </div>
                        }
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
                        {this.state.gifts.map((item, key) => <Segment key={key} id={item.id}>{item.name}<br/>{item.price}<br/><a href={item.url} target="_blank">{item.url}</a><button onClick={() => this.deleteGift(item.id)}>Delete</button></Segment>)}
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