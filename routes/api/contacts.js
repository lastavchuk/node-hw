const express = require('express');
const router = express.Router();

const ctrl = require('../../controllers/contacts');
const schemas = require('../../schemas/contacts');
const { validateBody, isValidId, authenticate } = require('../../middlewares');

router.get('/', authenticate, ctrl.listContacts);
router.post('/', authenticate, validateBody(schemas.contactSchemaJoi), ctrl.addContact);

router.get('/:contactId', authenticate, isValidId, ctrl.getContactById);
router.put('/:contactId', authenticate, isValidId, validateBody(schemas.contactSchemaJoi), ctrl.updateContact);
router.delete('/:contactId', authenticate, isValidId, ctrl.removeContact);

router.patch('/:contactId/favorite', authenticate, isValidId, validateBody(schemas.favoriteSchemaJoi, true), ctrl.updateContact);

module.exports = router;
