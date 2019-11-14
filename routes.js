const express = require('express');

const User = require('./functions/user')

const routes = express.Router();

routes.get('/user', User.index);
routes.post('/user', User.store);
routes.get('/user/:uid', User.show);
// routes.put('/user/:uid', User.edit);
routes.delete('/user/:uid', User.destroy);

module.exports = routes;