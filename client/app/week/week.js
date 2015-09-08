'use strict';

angular.module('rotisserieApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/weeks', {
        templateUrl: 'app/week/week.html',
        controller: 'WeekCtrl',
        authenticate: true
      });
  });
