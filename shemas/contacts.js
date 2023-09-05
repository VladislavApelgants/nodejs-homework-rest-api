const Joi = require("joi");
const messagesErrors = {
  "string.base": "Field {#label} must be a string.",
  "string.empty": "Field {#label} cannot be empty.",
  "string.email": "Field {#label} must be a valid email address.",
  "string.pattern.base": "Field {#label} must be in the format (XXX) XXX-XXXX.",
  "any.required": "missing required {#label} field",
};

const contactsShema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .required(),
})
  .unknown(false)
  .messages(messagesErrors);

module.exports = contactsShema;
