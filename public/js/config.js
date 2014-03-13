'use strict';

//Setting up route
var mean = angular.module('mean').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        // For unmatched routes:
        $urlRouterProvider.otherwise('/');

        // states for my app
        $stateProvider
            .state('all articles', {
                url: '/articles',
                templateUrl: 'views/articles/list.html'
            })
            .state('create article', {
                url: '/articles/create',
                templateUrl: 'views/articles/create.html'
            })
            .state('edit article', {
                url: '/articles/:articleId/edit',
                templateUrl: 'views/articles/edit.html'
            })
            .state('article by id', {
                url: '/articles/:articleId',
                templateUrl: 'views/articles/view.html'
            })
            .state('all contacts', {
                url: '/contacts',
                templateUrl: 'views/contacts/list.html'
            })
            .state('create contacts', {
                url: '/contacts/create',
                templateUrl: 'views/contacts/create.html'
            })
            .state('contact by id', {
                url: '/contacts/:contactId',
                templateUrl: 'views/contacts/view.html'
            })
            .state('edit contact', {
                url: '/contacts/:contactId/edit',
                templateUrl: 'views/contacts/edit.html'
            })
            .state('home', {
                url: '/',
                templateUrl: 'views/index.html'
            });
    }
]);

//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);
