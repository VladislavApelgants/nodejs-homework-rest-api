const express = require("express");
const router = express.Router();
const {
  contactsControllers: {
    getAllContacts,
    getById,
    addNewContact,
    deleteContactById,
    updateContactById,
    updateFavoriteById,
  },
} = require("../../controllers");

const { validateBody, isValidId } = require("../../middlewares");
const {
  joiContactsShema,
  updateFavoriteSchema,
} = require("../../models/contact");

router.get("/", getAllContacts);

router.get("/:id", isValidId, getById);

router.post("/", validateBody(joiContactsShema), addNewContact);

router.delete("/:id", isValidId, deleteContactById);

router.put(
  "/:id",
  isValidId,
  validateBody(joiContactsShema),
  updateContactById
);
router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(updateFavoriteSchema),
  updateFavoriteById
);

module.exports = router;
