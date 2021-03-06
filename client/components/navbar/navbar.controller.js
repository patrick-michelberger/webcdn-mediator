'use strict';

angular.module('webcdnMediatorApp')
    .controller('NavbarCtrl', function($scope, $location) {
        $scope.menu = [{
            'title': 'statistics',
            'link': '/'
        }, {
            'title': 'info',
            'link': '/info'
        }];

        $scope.isCollapsed = true;

        $scope.isActive = function(route) {
            return route === $location.path();
        };
    });
