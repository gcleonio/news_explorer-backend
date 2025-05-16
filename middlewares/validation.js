const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateId = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().required().hex().length(24),
  }),
});

const validateUrl = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const validateArticleBody = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().messages({
      "string.empty": 'The "title" field cannot be empty',
    }),
    title: Joi.string().required().messages({
      "string.empty": 'The "title" field cannot be empty',
    }),
    text: Joi.string().required().messages({
      "string.empty": 'The "text" field cannot be empty',
    }),
    date: Joi.string().required().messages({
      "string.empty": 'The "date" field cannot be empty',
    }),
    source: Joi.string().required().messages({
      "string.empty": 'The "source" field cannot be empty',
    }),
    link: Joi.string().required().custom(validateUrl).messages({
      "string.empty": 'The "link" field cannot be empty',
      "string.uri": 'The "link" field must be a valid URL',
    }),
    image: Joi.string().required().custom(validateUrl).messages({
      "string.empty": 'The "image" field cannot be empty',
      "string.uri": 'The "image" field must be a valid URL',
    }),
  }),
});

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.empty": 'The "name" field cannot be empty',
      "string.min": 'The "name" field must be at least 2 characters long',
      "string.max": 'The "name" field must be at most 30 characters long',
    }),
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field cannot be empty',
      "string.email": 'The "email" field must be a valid email address',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field cannot be empty',
    }),
  }),
});

const validateLoginUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field cannot be empty',
      "string.email": 'The "email" field must be a valid email address',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field cannot be empty',
    }),
  }),
});

module.exports = {
  validateId,
  validateArticleBody,
  validateCreateUser,
  validateLoginUser,
};
