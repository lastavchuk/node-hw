const Joi = require("joi");
const errMsg = require("../consts/errors");
const regexp = require("../consts/regexps");

const contactSchemaJoi = Joi.object({
    name: Joi.string().min(3).max(50).required().messages({
        "string.min": errMsg.errMsgMin,
        "string.max": errMsg.errMsgMax,
        "string.empty": errMsg.errMsgNameRequired,
        "any.required": errMsg.errMsgNameRequired,
    }),
    email: Joi.string()
        .pattern(regexp.emailRegexp)
        .required()
        .messages({
            "string.pattern.base": `{email} ${errMsg.errMsgEmailRegexp}`,
            "string.empty": errMsg.errMsgNameRequired,
            "any.required": errMsg.errMsgEmailRequired,
        }),
    phone: Joi.string()
        .pattern(regexp.phoneRegexp)
        .required()
        .messages({
            "string.pattern.base": `{phone} ${errMsg.errMsgPhoneRegexp}`,
            "string.empty": errMsg.errMsgNameRequired,
            "any.required": errMsg.errMsgPhoneRequired,
        }),
    favorite: Joi.boolean(),
});

const favoriteSchemaJoi = Joi.object({
    favorite: Joi.boolean().required().messages({
        "any.required": errMsg.errMsgFavoriteRequired,
    }),
});

const schemas = {
    contactSchemaJoi,
    favoriteSchemaJoi,
};

module.exports = schemas;
