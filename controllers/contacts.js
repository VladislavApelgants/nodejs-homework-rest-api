// const Joi = require("joi");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");
const { httpError } = require("../helpers");

const { controllerWrapper } = require("../helpers");

// const schema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().email().required(),
//   phone: Joi.string()
//     .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
//     .required(),
// }).messages({
//   "string.base": "Field {#label} must be a string.",
//   "string.empty": "Field {#label} cannot be empty.",
//   "string.email": "Field {#label} must be a valid email address.",
//   "string.pattern.base": "Field {#label} must be in the format (XXX) XXX-XXXX.",
//   "any.required": "missing required {#label} field",
// });

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
  // const { error } = schema.validate(req.body);
  // if (error) throw httpError(400, error.message);
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
  // const { error } = schema.validate(req.body);
  // if (error) throw httpError(400, error.message);
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
