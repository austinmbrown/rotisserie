'use strict';

angular.module('rotisserieApp')
  .controller('WeekCtrl', function ($scope) {
    $scope.message = 'Hello';
  })
  .controller('WeekShowCtrl', function ($scope, $http, $routeParams) {
    $http.get('/api/weeks/' + $routeParams.id).success(function(weekData) {
      $scope.games = weekData;
    });
  });
