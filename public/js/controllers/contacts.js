'use strict';

var contactsController = angular.module('mean.contacts');

contactsController.controller('ContactsController', ['$scope', '$stateParams', '$location', 'Global', 'Contacts', function ($scope, $stateParams, $location, Global, Contacts) {
    $scope.global = Global;

    $scope.create = function() {
        var contact = new Contacts({
            name: this.name,
            fname: this.fname
        });
        contact.$save(function(response) {
            $location.path('contacts');
        });
        this.name = '';
        this.fname = '';
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

    $scope.open = function () {

        var modalInstance = $modal.open({
            templateUrl: '/views/contacts/create.html',
            controller: CreateContactCtrl
        });
        modalInstance.result.then(function () {

        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.ok = function () {
        $modalInstance.close($scope.create);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

}]);

//var CreateContact = function ($scope, $modal, $log) {
//
//    $scope.open = function () {
//
//        var modalInstance = $modal.open({
//            templateUrl: '/views/contacts/create.html',
//            controller: CreateContactCtrl
//        });
//        modalInstance.result.then(function () {
//
//        }, function () {
//            $log.info('Modal dismissed at: ' + new Date());
//        });
//    };
//};
//
//// Please note that $modalInstance represents a modal window (instance) dependency.
//// It is not the same as the $modal service used above.
//
//var CreateContactCtrl = function ($scope, $modalInstance) {
//
//    $scope.ok = function () {
//        $modalInstance.close(contactsController.create());
//    };
//
//    $scope.cancel = function () {
//        $modalInstance.dismiss('cancel');
//    };
//};