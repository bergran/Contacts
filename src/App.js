import React, { Component } from 'react'
import ContactList from './contactList'
import CreateContact from './createContact'
import * as contactApi from './utils/ContactsAPI'
import { Route } from 'react-router-dom'


class App extends Component {

    state = {
        contacts: [],
    }

    componentDidMount () {
        contactApi.getAll().then((contacts) => {
            this.setState({ contacts })
        })
    }

    removeContact = (contact) => {
        this.setState((prevState) => ({
            contacts: prevState.contacts.filter((c) => (c.id !== contact.id))
        }))
        contactApi.remove(contact)
    }

    render () {
        const { contacts } = this.state
        return <div className='app'>
            <Route exact path='/' render={() =>
                <ContactList
                    contacts={ contacts }
                    onDeleteContact={this.removeContact}
                />
            }/>
            <Route path='/create' component={CreateContact}/>
        </div>
    }
}

export default App
