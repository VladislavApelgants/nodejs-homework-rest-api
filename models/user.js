const { Schema, model } = require("mongoose");
const { mongoError } = require("../helpers");
const Joi = require("joi");
const emailRegexp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const userShema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

userShema.post("save", mongoError);

const joiRegisterShema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  subscription: Joi.string(),
});

const joiLoginShema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const joiSubscriptionShema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const shemas = { joiLoginShema, joiRegisterShema, joiSubscriptionShema };

const User = model("user", userShema);

module.exports = { User, shemas };
