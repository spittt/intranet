'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Contact = mongoose.model('Contact'),
    _ = require('lodash');


/**
 * Find contact by id
 */
exports.contact = function(req, res, next, id) {
    Contact.load(id, function(err, contact) {
        if (err) return next(err);
        if (!contact) return next(new Error('Failed to load contact ' + id));
        req.contact = contact;
        next();
    });
};

/**
 * Create a contact
 */
exports.create = function(req, res) {
    var contact = new Contact(req.body);
    contact.user = req.user;

    contact.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                contact: contact
            });
        } else {
            res.jsonp(contact);
        }
    });
};

/**
 * Update a contact
 */
exports.update = function(req, res) {
    var contact = req.contact;

    contact = _.extend(contact, req.body);

    contact.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                contact: contact
            });
        } else {
            res.jsonp(contact);
        }
    });
};

/**
 * Delete a contact
 */
exports.destroy = function(req, res) {
    var contact = req.contact;

    contact.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                contact: contact
            });
        } else {
            res.jsonp(contact);
        }
    });
};

/**
 * Show an contact
 */
exports.show = function(req, res) {
    res.jsonp(req.contact);
};

/**
 * List of Contacts
 */
exports.all = function(req, res) {
    Contact.find().sort('-created').populate('user', 'name username').exec(function(err, contacts) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(contacts);
        }
    });
};
