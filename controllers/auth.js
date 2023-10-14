const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const ctrlWrapper = require("../helpers/ctrlWrapper");
const HttpError = require("../helpers/HttpError");
const errMsg = require("../consts/errors");

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
    const hashPass = await bcrypt.hash(req.body.password, 10);
    const result = await User.create({ ...req.body, password: hashPass });

    res.status(201).json({
        user: {
            email: result.email,
            subscription: result.subscription,
        },
    });
};

const login = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(401, errMsg.errMsgAuthInvalid);
    }

    const copmarePass = await bcrypt.compare(req.body.password, user.password);
    if (!copmarePass) {
        throw HttpError(401, errMsg.errMsgAuthInvalid);
    }

    const payload = { id: user._id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "12h" });

    await User.findByIdAndUpdate(user._id, { token });

    res.json({
        token,
        user: {
            email: user.email,
            subscription: user.subscription,
        },
    });
};

const current = async (req, res) => {
    const { email, subscription } = req.user;
    res.json({ email, subscription });
};

const logout = async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, { token: "" });

    res.status(204).json();
};

const subscription = async (req, res) => {
    const result = await User.findByIdAndUpdate(req.user._id, req.body, {
        new: true,
    });
    if (!result) {
        throw HttpError(404);
    }

    req.user.subscription = result.subscription;

    res.json({
        user: {
            email: result.email,
            subscription: result.subscription,
        },
    });
};

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    current: ctrlWrapper(current),
    subscription: ctrlWrapper(subscription),
    logout: ctrlWrapper(logout),
};
