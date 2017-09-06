import React, { Component } from 'react'
import ContactList from './contactList'
import CreateContact from './createContact'
import * as contactApi from './utils/ContactsAPI'

class App extends Component {

    state = {
        contacts: [],
        screen: 'list'
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

    onNavigate = () => {
        this.setState({
            screen: 'formAdd'
        })
    }

    render () {
        const { screen, contacts } = this.state
        return <div>
            {
                screen === 'list' &&
                <ContactList
                    contacts={ contacts }
                    onDeleteContact={this.removeContact}
                    onNavigate={this.onNavigate}
                />
            }
            {
                screen === 'formAdd' &&
                <CreateContact />
            }

        </div>
    }
}

export default App
