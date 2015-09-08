'use strict';

angular.module('rotisserieApp')
  .controller('WeekCtrl', function ($scope, $http, User) {
    $http.get('/api/weeks').success(function(weekData) {
      $scope.weeks = []
      for (var i = 1; i <= 17; i++) {
        $scope.weeks.push(
          weekData.filter(function(game){
            game["pick"] = "";
            return game['week']==i;
          })
        );
      };
    });

    $scope.setPick = function(pickedGame, pickedTeam) {
      console.log(pickedGame);
      console.log(pickedTeam);
      pickedGame.pick = pickedTeam;
      // console.log(user);
      // $http.post('/api/users/' + user.id + '/picks', {
      //   user:
      //   game: game.id
      //   pick:
      // })
    };
  })
  .controller('WeekShowCtrl', function ($scope, $http, $routeParams) {
    $http.get('/api/weeks/' + $routeParams.id).success(function(weekData) {
      $scope.games = weekData;
    });
  });


