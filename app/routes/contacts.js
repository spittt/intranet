'use strict';

// Articles routes use articles controller
var contacts = require('../controllers/contacts');
var authorization = require('./middlewares/authorization');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
	if (req.contact.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/contacts', contacts.all);
    app.post('/contacts', authorization.requiresLogin, contacts.create);
    app.get('/contacts/:contactId', contacts.show);
    app.put('/contacts/:contactId', authorization.requiresLogin, hasAuthorization, contacts.update);
    app.del('/contacts/:contactId', authorization.requiresLogin, hasAuthorization, contacts.destroy);

    // Finish with setting up the articleId param
    app.param('contactId', contacts.contact);

};