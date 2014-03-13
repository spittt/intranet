'use strict';

//Contacts service used for articles REST endpoint
angular.module('mean').factory('Contacts', ['$resource', function($resource) {
    return $resource('contacts/:contactId', {
        contactId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);
