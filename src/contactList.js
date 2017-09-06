import React, { Component } from 'react'
import PropTypes from 'prop-types'
import escape from 'escape-string-regexp'
import sortBy from 'sort-by'

const Anchor = props => {
  return (
    <a {...props}>{ props.children }</a>
  );
}


class ContactList extends Component {

    static propTypes = {
        contacts: PropTypes.array.isRequired,
        onDeleteContact: PropTypes.func.isRequired
    }

    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState({query: query.trim()})
    }

    clearQuery = () => {
        this.setState({
            query: ''
        })
    }

    render () {
        const { contacts, onDeleteContact } = this.props
        const { query } = this.state

        let showContacts
        if (query) {
            const match = new RegExp(escape(query), 'i')
            showContacts = contacts.filter(contact => match.test(contact.name))
        } else {
            showContacts = contacts
        }

        showContacts.sort(sortBy('name'))

        return (
            <div className='list-contacts'>
                <div className="list-contacts-top">
                    <input type="text"
                        className='search-contacts'
                        placeholder='Search contacts'
                        value={query}
                        onChange={(event) => this.updateQuery(event.target.value)}
                    />
                    <Anchor href="#create"
                            onClick={() => {this.props.onNavigate()}}
                            className='add-contact'/>
                </div>
                {
                    showContacts.length !== contacts.length &&
                        <div className='showing-contacts'>
                            <span>Showing { showContacts.length } of { contacts.length }</span>
                            <button onClick={this.clearQuery}>Show all</button>
                        </div>
                }
                <ol className='contact-list'>
                    {
                        showContacts.map((contact) =>
                            <li key={contact.id} className='contact-list-item'>
                                <div className='contact-avatar' style={{
                                    backgroundImage: `url(${contact.avatarURL})`
                                }} />
                                <div className='contact-details'>
                                    <p>{contact.name}</p>
                                    <p>{contact.email}</p>
                                </div>
                                <button onClick={() => onDeleteContact(contact) } className='contact-remove'>
                                    Remove
                                </button>
                            </li>)
                    }
                </ol>
            </div>
        )
    }
}

export default ContactList
