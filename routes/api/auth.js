const express = require('express');
const router = express.Router();

const ctrl = require('../../controllers/auth');
const schemas = require('../../schemas/auth');
const { validateBody, authenticate } = require('../../middlewares');

router.post('/login', validateBody(schemas.loginSchemaJoi), ctrl.login);

router.post('/register', validateBody(schemas.registerSchemaJoi), ctrl.register);

router.patch('/', authenticate, validateBody(schemas.subscriptionSchemaJoi), ctrl.subscription);

router.get('/current', authenticate, ctrl.current);

router.post('/logout', authenticate, ctrl.logout);

module.exports = router;
