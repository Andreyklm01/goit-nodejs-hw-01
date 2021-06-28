const fs = require('fs/promises');
const path = require('path');
const { v4 } = require('uuid');

const contactsPath = path.join(__dirname, './db/contacts.json');

async function listContacts() {
  try {
    const getContacts = await fs.readFile(contactsPath);
    const getParsedContacts = JSON.parse(getContacts);
    return getParsedContacts;
  } catch (error) {
    throw error;
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const findContact = contacts.find(item => item.id == contactId);
    if (!findContact) {
      throw new Error('Incorrect ID');
    }

    return findContact;
  } catch (error) {
    error.message = 'Contact not found';
    throw error;
  }
}

async function updateContactsList(contacts) {
  const string = JSON.stringify(contacts);
  try {
    await fs.writeFile(contactsPath, string);
  } catch (error) {
    throw error;
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const filteredContacts = contacts.filter(item => item.id != contactId);

    await updateContactsList(filteredContacts);
  } catch (error) {
    error.message = 'Contact not found';
    throw error;
  }
}

async function addContact(name, email, phone) {
  const newContact = { id: v4(), name, email, phone };
  try {
    const contacts = await listContacts();
    const newContacts = [...contacts, newContact];

    await updateContactsList(newContacts);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
