'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Contact Schema
 */
var ContactSchema;
ContactSchema = new Schema({
    name: {
        type: String,
        default: '',
        trim: true
    },
    fname: {
        type: String,
        default: '',
        trim: true
    },
    adresse: {
        type: String,
        default: '',
        trim: true
    },
    service: {
        type: String,
        default: '',
        trim: true
    },
    phone: {
        type: String,
        default: '',
        trim: true
    },
    mobile: {
        type: String,
        default: '',
        trim: true
    },
    fax: {
        type: String,
        default: '',
        trim: true
    },
    email: {
        type: String,
        default: '',
        trim: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

/**
 * Validations
 */
ContactSchema.path('name').validate(function(name) {
    return name.length;
}, 'Name cannot be blank');

/**
 * Statics
 */
ContactSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Contact', ContactSchema);
