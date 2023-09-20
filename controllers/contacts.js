const { Contact } = require("../models/contact");

const { httpError } = require("../helpers");

const { controllerWrapper } = require("../helpers");

async function getAllContacts(req, res) {
  const respData = await Contact.find();
  res.status(200).json(respData);
}

async function getById(req, res) {
  const { id } = req.params;
  const respData = await Contact.findById(id);
  if (!respData) {
    throw httpError(404, "Not found");
  }
  res.status(200).json(respData);
}

async function addNewContact(req, res) {
  const respData = await Contact.create(req.body);
  res.status(201).json(respData);
}

async function deleteContactById(req, res) {
  const { id } = req.params;
  const respData = await Contact.findByIdAndRemove(id);
  if (!respData) throw httpError(404, "Not found");
  res.status(200).json({ message: "contact deleted" });
}

async function updateContactById(req, res) {
  const { id } = req.params;
  const respData = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!respData) throw httpError(404, "Not found");
  res.json(respData);
}
async function updateFavoriteById(req, res) {
  const { id } = req.params;
  const respData = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!respData) throw httpError(404, "Not found");
  res.json(respData);
}
module.exports = {
  getAllContacts: controllerWrapper(getAllContacts),
  getById: controllerWrapper(getById),
  addNewContact: controllerWrapper(addNewContact),
  deleteContactById: controllerWrapper(deleteContactById),
  updateContactById: controllerWrapper(updateContactById),
  updateFavoriteById: controllerWrapper(updateFavoriteById),
};
