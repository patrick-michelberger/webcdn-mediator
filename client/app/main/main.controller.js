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

    $scope.deleteHost = function(uuid) {
      console.log("delete host: ", uuid);
      $http.delete("/api/hosts/" + uuid);
    };

  });