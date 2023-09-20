const express = require("express");
const router = express.Router();
const { validateBody, authenticate } = require("../../middlewares");
const {
  shemas: { joiRegisterShema, joiLoginShema, joiSubscriptionShema },
} = require("../../models");
const {
  usersController: { register, login, getCurrent, logout, setSubscription },
} = require("../../controllers");

router.post("/register", validateBody(joiRegisterShema), register);
router.post("/login", validateBody(joiLoginShema), login);
router.get("/current", authenticate, getCurrent);
router.post("/logout", authenticate, logout);
router.patch(
  "/",
  authenticate,
  validateBody(joiSubscriptionShema),
  setSubscription
);

module.exports = router;
