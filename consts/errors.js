const errMsgMin = "The name must have a minimum of 3 characters";
const errMsgMax = "The name must have a maximum of 50 characters";

const errMsgEmailRegexp = "is not a valid email!";
const errMsgPhoneRegexp =
    "is not a valid phone format! Example: (000) 000 0000";

function errFieldIsrequired(field) {
    return `${field} is required!`;
}

module.exports = {
    errMsgMin,
    errMsgMax,
    errMsgEmailRegexp,
    errMsgPhoneRegexp,
    errFieldIsrequired,
};
