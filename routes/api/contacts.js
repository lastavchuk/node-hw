const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/contacts");
const validateBody = require("../../middlewares/validateBody");
const dataSchema = require("../../schemas/contacts");

router.get("/", ctrl.listContacts);

router.post("/", validateBody(dataSchema), ctrl.addContact);

router.get("/:contactId", ctrl.getContactById);

router.put("/:contactId", validateBody(dataSchema), ctrl.updateContact);

router.delete("/:contactId", ctrl.removeContact);

module.exports = router;
