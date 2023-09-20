const { Schema, model } = require("mongoose");
const { mongoError } = require("../helpers");
const Joi = require("joi");

const messagesErrors = {
  "string.base": "Field {#label} must be a string.",
  "string.empty": "Field {#label} cannot be empty.",
  "string.email": "Field {#label} must be a valid email address.",
  "string.pattern.base": "Field {#label} must be in the format (XXX) XXX-XXXX.",
  "any.required": "missing required {#label} field",
};

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", mongoError);

const joiContactsShema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .required(),
  favorite: Joi.boolean(),
})
  .unknown(false)
  .messages(messagesErrors);

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
}).messages({
  "boolean.favorite": "Field {#label} must be a true or false.",
  "any.required": "missing required {#label} field",
});

const Contact = model("contact", contactSchema);

module.exports = { Contact, joiContactsShema, updateFavoriteSchema };
