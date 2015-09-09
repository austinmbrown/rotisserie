'use strict';

angular.module('rotisserieApp')
  .controller('WeekCtrl', function ($scope, $http, Auth, User) {
    var user = Auth.getCurrentUser();
    console.log(user._id);
    $http.get('/api/weeks/' + user._id).success(function(weekData) {
      $scope.weeks = []
      for (var i = 1; i <= 17; i++) {
        $scope.weeks.push(
          weekData.filter(function(game){
            return game['week']==i;
          })
        );
        console.log($scope.weeks)
      };
    });

    $scope.setPick = function(pickedGame, pickedTeam) {
      pickedGame.pick = pickedTeam;
      console.log(user._id);
      $http.post('/api/users/' + user._id + '/picks', {
        user: user._id,
        game: pickedGame.id,
        pick: pickedTeam
      });
    };
  })
  .controller('WeekShowCtrl', function ($scope, $http, $routeParams) {
    $http.get('/api/weeks/' + $routeParams.id).success(function(weekData) {
      $scope.games = weekData;
    });
  });


