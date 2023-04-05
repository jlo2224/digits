import { Meteor } from 'meteor/meteor';
import { Contacts } from '../../api/contact/Contact.js';

/* eslint-disable no-console */

// Initialize the database with a default data document.

const addContact = (contact) => {
  console.log(`  Adding: ${contact.firstName} (${contact.owner})`);
  Contacts.collection.insert(contact);
};

// Initialize the StuffsCollection if empty.
if (Contacts.collection.find().count() === 0) {
  if (Meteor.settings.defaultContacts) {
    console.log('Creating default data.');
    Meteor.settings.defaultContacts.forEach(contact => addContact(contact));
  }
}
