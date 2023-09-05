const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");
const { httpError } = require("../helpers");

const { controllerWrapper } = require("../helpers");

async function getAllContacts(req, res) {
  const respData = await listContacts();
  res.status(200).json(respData);
}

async function getById(req, res) {
  const { id } = req.params;
  const respData = await getContactById(id);
  if (!respData) {
    throw httpError(404, "Not found");
  }
  res.status(200).json(respData);
}

async function addNewContact(req, res) {
  const respData = await addContact(req.body);
  res.status(201).json(respData);
}

async function deleteContactById(req, res) {
  const { id } = req.params;
  const respData = await removeContact(id);
  if (!respData) throw httpError(404, "Not found");
  res.status(200).json({ message: "contact deleted" });
}

async function updateContactById(req, res) {
  const { id } = req.params;
  const respData = await updateContact(id, req.body);
  if (!respData) throw httpError(404, "Not found");
  res.json(respData);
}
module.exports = {
  getAllContacts: controllerWrapper(getAllContacts),
  getById: controllerWrapper(getById),
  addNewContact: controllerWrapper(addNewContact),
  deleteContactById: controllerWrapper(deleteContactById),
  updateContactById: controllerWrapper(updateContactById),
};
