'use strict';

//var contactsController = angular.module('mean.contacts');
var contactController = angular.module('mean');
contactController.controller('ContactsController', ['$scope', '$stateParams', '$state','$location', 'Global', 'Contacts', function ($scope, $stateParams, $state,$location, Global, Contacts) {
    $scope.global = Global;

    $scope.newContact = {};

    $scope.create = function() {

        var contact = new Contacts({

            name: $scope.newContact.name,
            fname: $scope.newContact.fname,
            adresse: $scope.newContact.adresse,
            service: $scope.newContact.service,
            phone: $scope.newContact.phone,
            mobile: $scope.newContact.mobile,
            fax: $scope.newContact.fax,
            email: $scope.newContact.email
        });
        contact.$save(function(response) {
            $location.path('contacts');
        });
        this.name = '';
        this.fname = '';
        this.adresse= '';
        this.service = '';
        this.phone = '';
        this.mobile = '';
        this.fax = '';
        this.email = '';

        $('#Modal').modal('hide');
        $state.go($state.$current, null, { reload: true });
    };

    $scope.remove = function(contact) {
        if (contact) {
            contact.$remove();

            for (var i in $scope.contacts) {
                if ($scope.contacts[i] === contact) {
                    $scope.contacts.splice(i, 1);
                }
            }
        }
        else {
            $scope.contact.$remove();
            $location.path('contacts');
        }
    };

    $scope.update = function() {

        var contact = $scope.contact;
        if (!contact.updated) {
            contact.updated = [];
        }
        contact.updated.push(new Date().getTime());

        contact.$update(function() {
            $location.path('contacts');
        });
    };

    $scope.find = function() {
        Contacts.query(function(Contacts) {
            $scope.contacts = Contacts;
        });
    };

    $scope.save = function(contact) {
        contact.$update(function() {
            //$scope.init();
            $location.path('contacts');
        });
    };

    $scope.findOne = function() {
        Contacts.get({
            contactId: $stateParams.contactId
        }, function(contact) {
            $scope.contact = contact;
        });
    };
    $scope.orderName = 'name';

    $scope.open = function () {
        $('#Modal').modal('show');
    };

}]);

contactController.run(function(editableOptions) {
    editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});