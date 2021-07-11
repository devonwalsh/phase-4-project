import React, { Component } from 'react';
import { Container, Dimmer, Loader, Segment, Button, Form } from 'semantic-ui-react';

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
        editGiftId: '',
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

    populateEditGift = (giftId) => {
        let gift = this.state.gifts.find(item => item.id === parseInt(giftId))
        this.setState({...this.state, editGiftId: gift.id, editGiftName: gift.name, editGiftPrice: gift.price, editGiftLink: gift.url})
    }

    editGift = (e) => {
        e.preventDefault();
        fetch(`/recipients/${this.props.match.params.recipientId}/gifts/${this.state.editGiftId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: this.state.editGiftName,
                price: this.state.editGiftPrice,
                url: this.state.editGiftLink
            })
        })
        .then(res => res.json())
        .then(data => this.updateGiftInState(data))
    }

    updateGiftInState = (gift) => {
        let index = this.state.gifts.findIndex(item => item.id === gift.id)
        let updatedGifts = this.state.gifts
        updatedGifts[index] = gift
        this.setState({...this.state, gifts: updatedGifts, editGiftId: '', editGiftName: '', editGiftPrice: '', editGiftLink: ''})
    }

    componentDidMount() {
        this.fetchRecipient()
    }

    render() {
        if (this.props.loggedIn) {
            if (this.state.loading === false) {
                return (
                    <Container className="gift-list">
                        {this.state.editRecipientFormOpen ? 
                        <Form className="styled-form" onSubmit={this.editRecipient}>
                        <label>Name</label>
                        <input type="text" id="name" value={this.state.recipientName} onChange={e => this.setState({ ...this.state, recipientName: e.target.value})}/>
                        <br/>
                        <label>Likes</label>
                        <input type="text" id="likes" value={this.state.recipientLikes} onChange={e => this.setState({ ...this.state, recipientLikes: e.target.value})}/>
                        <br/>
                        <label>Birthday</label>
                        <input type="date" id="birthday" value={this.state.recipientBirthday} onChange={e => this.setState({ ...this.state, recipientBirthday: e.target.value})}/>
                        <input class="ui button submit-button" type="submit"/>
                    </Form>
                        :
                        <div className="recipient-info">
                            <h1>{this.state.recipientName}</h1>
                            <h3 className="recipient-info-text">Likes: {this.state.recipientLikes}</h3>
                            <h3 className="recipient-info-text">Birthday: {this.state.recipientBirthday}</h3>
                            <Button class="ui button" className="edit-giftee-button" color="blue" inverted onClick={() => this.toggleEditRecipientForm()}>Edit Giftee</Button>
                        </div>
                        }
                        {this.state.addGiftFormOpen ? 
                            <Form className="styled-form" onSubmit={this.createGift}>
                                <label>Name</label>
                                <input type="text" id="name" value={this.state.newGiftName} onChange={e => this.setState({ ...this.state, newGiftName: e.target.value})}/>
                                <br/>
                                <label>Price</label>
                                <input type="number" id="price" value={this.state.newGiftPrice} onChange={e => this.setState({ ...this.state, newGiftPrice: e.target.value})}/>
                                <br/>
                                <label>Link</label>
                                <input type="text" id="link" value={this.state.newGiftLink} onChange={e => this.setState({ ...this.state, newGiftLink: e.target.value})}/>
                                <input class="ui button submit-button" type="submit"/>
                            </Form> : 
                            <Button color="blue" className="add-gift-button" onClick={() => this.toggleAddGiftForm()}>Add Gift</Button>
                        }
                        {this.state.gifts.map((item, key) => 
                            this.state.editGiftId === item.id ? 
                            <Segment>
                            <Form className="styled-form" onSubmit={(e) => this.editGift(e)}>
                                <label>Name</label>
                                <input type="text" id="name" value={this.state.editGiftName} onChange={e => this.setState({ ...this.state, editGiftName: e.target.value})}/>
                                <br/>
                                <label>Price</label>
                                <input type="number" id="price" value={this.state.editGiftPrice} onChange={e => this.setState({ ...this.state, editGiftPrice: e.target.value})}/>
                                <br/>
                                <label>Link</label>
                                <input type="text" id="link" value={this.state.editGiftLink} onChange={e => this.setState({ ...this.state, editGiftLink: e.target.value})}/>
                                <input class="ui button submit-button" type="submit"/>
                            </Form>
                            </Segment> :
                            <Segment className="gift-item" key={key} id={item.id}>
                                <div>
                                    {item.name}<br/>
                                    ${item.price}<br/>
                                    <a href={item.url} target="_blank" rel="noreferrer">{item.url}</a>
                                </div>
                                <div>
                                    <Button class="ui button" className="gift-button" onClick={(e) => this.populateEditGift(e.target.parentNode.parentNode.id)}>Edit</Button>
                                    <Button class="ui button" className="gift-button" onClick={() => this.deleteGift(item.id)}>Delete</Button>
                                </div>
                            </Segment>)}
                    </Container>
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