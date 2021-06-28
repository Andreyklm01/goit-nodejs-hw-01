const contacts = require('./contacts');
const { Command } = require('commander');

const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const contactsList = await contacts.listContacts();
      console.table(contactsList);
      break;

    case 'get':
      const getContact = await contacts.getContactById(id);
      console.log(getContact);
      break;

    case 'add':
      const addContact = await contacts.addContact(name, email, phone);
      console.log(addContact);
      console.log('Contact added');
      break;

    case 'remove':
      const removedContact = await contacts.removeContact(id);
      console.log(removedContact);
      console.log('Contact removed');
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};

invokeAction(argv);
