const fs = require("fs/promises");
const { nanoid } = require("nanoid");

const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");

const writeContact = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
  const dataContacts = await fs.readFile(contactsPath);
  return JSON.parse(dataContacts);
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const contact = allContacts.find((elem) => elem.id === contactId);
  return contact || null;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((elem) => elem.id === contactId);
  if (index === -1) return null;
  const [deleteElem] = allContacts.splice(index, 1);
  await writeContact(allContacts);
  return deleteElem;
};

const addContact = async (body) => {
  const allContacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...body,
  };
  allContacts.push(newContact);
  await writeContact(allContacts);
  return newContact;
};

const updateContact = async (id, body) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((elem) => elem.id === id);
  if (index === -1) return null;
  allContacts[index] = {
    id,
    ...body,
  };
  await writeContact(allContacts);
  return allContacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
