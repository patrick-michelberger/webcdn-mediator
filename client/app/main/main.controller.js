'use strict';

angular.module('webcdnMediatorApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.hosts = [];
    $scope.isCollapsed = true;

    $http.get('/api/hosts').success(function(hosts) {
      $scope.hosts = hosts;
      socket.syncUpdates('host', $scope.hosts);
    });

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('host');
    });
  });
