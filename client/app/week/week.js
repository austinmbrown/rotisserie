'use strict';

angular.module('rotisserieApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/week', {
        templateUrl: 'app/week/week.html',
        controller: 'WeekCtrl'
      })
      .when('/week/:id', {
        templateUrl: 'app/week/weekShow.html',
        controller: 'WeekShowCtrl'
      });
  });
