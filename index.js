import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
} from "./contacts.js";
import { Command } from "commander";

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts().then((contacts) => {
        console.table(contacts);
      });
      break;

    case "get":
      getContactById(id).then((contact) => {
        console.log(contact);
      });
      break;

    case "add":
      addContact(name, email, phone).then((newContact) => {
        console.log(newContact);
      });
      break;

    case "remove":
      removeContact(id).then((deletedContact) => {
        console.log(deletedContact);
      });
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
