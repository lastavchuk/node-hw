const Contact = require("../models/contact");

const ctrlWrapper = require("../helpers/ctrlWrapper");
const HttpError = require("../helpers/HttpError");

const listContacts = async (req, res) => {
    const result = await Contact.find({});
    res.json(result);
};

const getContactById = async (req, res) => {
    const result = await Contact.findById(req.params.contactId);
    if (!result) {
        throw HttpError(404);
    }
    res.json(result);
};

const addContact = async (req, res) => {
    const result = await Contact.create(req.body);
    res.status(201).json(result);
};

const removeContact = async (req, res) => {
    const result = await Contact.findByIdAndRemove(req.params.contactId);
    if (!result) {
        throw HttpError(404);
    }
    res.status(200).json({ message: "Contact deleted" });
};

const updateContact = async (req, res) => {
    const result = await Contact.findByIdAndUpdate(
        req.params.contactId,
        req.body,
        { new: true }
    );
    if (!result) {
        throw HttpError(404);
    }
    res.json(result);
};

module.exports = {
    listContacts: ctrlWrapper(listContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    removeContact: ctrlWrapper(removeContact),
    updateContact: ctrlWrapper(updateContact),
};
