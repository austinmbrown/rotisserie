'use strict';

angular.module('rotisserieApp')
  .controller('WeekCtrl', function ($scope, $http, Auth, User) {
    $scope.weekSelection = 1;
    $scope.weeks = {};
    var user = Auth.getCurrentUser();
    console.log(user._id);

    $scope.setPick = function(pickedGame, pickedTeam) {
      pickedGame.pick = pickedTeam;
      console.log(user._id);
      $http.post('/api/users/' + user._id + '/picks', {
        user: user._id,
        game: pickedGame.id,
        pick: pickedTeam
      });
    };

    $scope.$watch('weekSelection', function(){
      console.log("week changed", $scope.weekSelection);
      $http.get('api/weeks/' + $scope.weekSelection + "/" + user._id).success(function(weekData) {
        $scope.weeks[$scope.weekSelection - 1] = weekData;
      })
    })
  })



