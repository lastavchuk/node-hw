const Joi = require("joi");
const errMsg = require("../consts/errors");
const regexp = require("../consts/regexps");

const contactSchemaJoi = Joi.object({
    name: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            "string.min": errMsg.errMsgMin,
            "string.max": errMsg.errMsgMax,
            "string.empty": errMsg.errFieldIsrequired("Name"),
            "any.required": errMsg.errFieldIsrequired("Name"),
        }),
    email: Joi.string()
        .pattern(regexp.emailRegexp)
        .required()
        .messages({
            "string.pattern.base": `{email} ${errMsg.errMsgEmailRegexp}`,
            "string.empty": errMsg.errFieldIsrequired("Email"),
            "any.required": errMsg.errFieldIsrequired("Email"),
        }),
    phone: Joi.string()
        .pattern(regexp.phoneRegexp)
        .required()
        .messages({
            "string.pattern.base": `{phone} ${errMsg.errMsgPhoneRegexp}`,
            "string.empty": errMsg.errFieldIsrequired("Phone number"),
            "any.required": errMsg.errFieldIsrequired("Phone number"),
        }),
    favorite: Joi.boolean(),
});

const favoriteSchemaJoi = Joi.object({
    favorite: Joi.boolean()
        .required()
        .messages({
            "any.required": errMsg.errFieldIsrequired("Favorite"),
        }),
});

const schemas = {
    contactSchemaJoi,
    favoriteSchemaJoi,
};

module.exports = schemas;
