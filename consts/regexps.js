const emailRegexp =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

const phoneRegexp = /^[(]0[0-9]{2}[)]\s[0-9]{3}\s[0-9]{4}$/;

module.exports = {
    emailRegexp,
    phoneRegexp,
};
