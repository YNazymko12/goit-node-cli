import { program } from 'commander';
import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} from './contacts.js';

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse();
const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      console.log('Fetching all contacts...');
      const contacts = await listContacts();
      console.table(contacts);
      break;

    case 'get':
      console.log(`Fetching contact with id=${id}...`);
      const contact = await getContactById(id);
      console.table(contact ? contact : `Contact with id=${id} not found`);
      break;

    case 'add':
      console.log(
        `Adding new contact: Name=${name}, Email=${email}, Phone=${phone}...`
      );
      const newContact = await addContact(name, email, phone);
      console.log(newContact);
      break;

    case 'remove':
      console.log(`Removing contact with id=${id}...`);
      const removedContact = await removeContact(id);
      console.log(
        removedContact ? removedContact : `Contact with id=${id} not found`
      );
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(options);
