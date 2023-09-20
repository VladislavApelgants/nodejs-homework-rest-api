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

const {
  validateBody,
  isValidId,
  validateBodyFavorite,
  authenticate,
} = require("../../middlewares");
const { joiContactsShema, updateFavoriteSchema } = require("../../models");

router.get("/", authenticate, getAllContacts);

router.get("/:id", authenticate, isValidId, getById);

router.post("/", authenticate, validateBody(joiContactsShema), addNewContact);

router.delete("/:id", authenticate, isValidId, deleteContactById);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(joiContactsShema),
  updateContactById
);
router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateBodyFavorite(updateFavoriteSchema),
  updateFavoriteById
);

module.exports = router;
