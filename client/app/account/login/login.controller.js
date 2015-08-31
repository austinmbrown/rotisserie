'use strict';

angular.module('rotisserieApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $window) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          $location.path('/week/' + thisweek);
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });

// The following code figures out what week is is within the 2015 season.
var now = moment();
// This array represents the ending dates for each week.
var weeks = [
  "2015-09-15",
  "2015-09-22",
  "2015-09-29",
  "2015-10-06",
  "2015-10-13",
  "2015-10-20",
  "2015-10-27",
  "2015-11-03",
  "2015-11-10",
  "2015-11-17",
  "2015-11-24",
  "2015-12-01",
  "2015-12-08",
  "2015-12-15",
  "2015-12-22",
  "2015-12-29",
  "2016-01-04"
];
for (var i = 1; i < weeks.length; i++) {
  if (now.isBefore(moment(weeks[i]))) {
    var thisweek = i;
    break;
  }
}

