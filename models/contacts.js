const fs = require("fs/promises");
const path = require("path");
const randomId = require("crypto").randomUUID;

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
    return JSON.parse(await fs.readFile(contactsPath));
};

const getContactById = async (contactId) => {
    const contacts = await listContacts();
    const res = contacts.find(({ id }) => id === contactId);

    return res || null;
};

const addContact = async (body) => {
    const contacts = await listContacts();
    const newContact = { id: randomId(), ...body };

    contacts.push(newContact);
    await writeContact(contacts);

    return newContact;
};

const updateContact = async (contactId, body) => {
    const contacts = await listContacts();
    const idx = contacts.findIndex(({ id }) => id === contactId);

    if (idx !== -1) {
        contacts[idx] = { id: contactId, ...body };
        await writeContact(contacts);

        return contacts[idx];
    }
    return null;
};

const removeContact = async (contactId) => {
    const contacts = await listContacts();
    const idx = contacts.findIndex(({ id }) => id === contactId);

    if (idx !== -1) {
        const resArr = contacts.splice(idx, 1);
        await writeContact(contacts);
        return resArr[0];
    }
    return null;
};

const writeContact = async (data) => {
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
};
