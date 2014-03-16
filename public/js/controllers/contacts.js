'use strict';

//var contactsController = angular.module('mean.contacts');
angular.module('mean').controller('ContactsController', ['$scope', '$stateParams', '$state','$location', 'Global', 'Contacts', function ($scope, $stateParams, $state,$location, Global, Contacts) {
    $scope.global = Global;

    $scope.create = function() {

        var contact = new Contacts({
            name: this.name,
            fname: this.fname,
            adresse: this.adresse,
            service: this.service,
            phone: this.phone,
            mobile: this.mobile,
            fax: this.fax,
            email: this.email
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

        $('#myModal').modal('hide');
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
//            $location.path('contacts/' + contact._id);
            $location.path('contacts');
        });
    };

    $scope.find = function() {
        Contacts.query(function(Contacts) {
            $scope.contacts = Contacts;
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
        $('#myModal').modal('show');
    };

}]);