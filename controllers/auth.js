const { User } = require("../models");
const { controllerWrapper, httpError } = require("../helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw httpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 13);
  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const userData = await User.findOne({ email });

  if (!userData) {
    throw httpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, userData.password);

  if (!passwordCompare) {
    throw httpError(401, "Email or password is wrong");
  }

  const payload = { id: userData._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  await User.findByIdAndUpdate(userData._id, { token });

  res.json({
    token,
    user: {
      email: userData.email,
      subscription: userData.subscription,
    },
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    email,
    subscription,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).end();
};

const setSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  const respData = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );

  res.status(200).json({
    email: respData.email,
    subscription: respData.subscription,
  });
};

module.exports = {
  register: controllerWrapper(register),
  login: controllerWrapper(login),
  getCurrent: controllerWrapper(getCurrent),
  logout: controllerWrapper(logout),
  setSubscription: controllerWrapper(setSubscription),
};
