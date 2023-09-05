const express = require("express");
const router = express.Router();
const {
  contactsControllers: {
    getAllContacts,
    getById,
    addNewContact,
    deleteContactById,
    updateContactById,
  },
} = require("../../controllers");

const { validateBody } = require("../../middlewares");
const { contactsShema } = require("../../shemas");

router.get("/", getAllContacts);

router.get("/:id", getById);

router.post("/", validateBody(contactsShema), addNewContact);

router.delete("/:id", deleteContactById);

router.put("/:id", validateBody(contactsShema), updateContactById);

module.exports = router;
