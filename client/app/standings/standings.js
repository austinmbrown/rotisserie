'use strict';

angular.module('rotisserieApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/standings', {
        templateUrl: 'app/standings/standings.html',
        controller: 'StandingsCtrl'
      });
  });
