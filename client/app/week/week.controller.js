'use strict';

angular.module('rotisserieApp')
  .controller('WeekCtrl', function ($scope, $http) {
    $http.get('/api/weeks').success(function(weekData) {
      $scope.weeks = []
      for (var i = 1; i <= 17; i++) {
        $scope.weeks.push(
          weekData.filter(function(game){
            game["pick"] = 0.5;
            return game['week']==i;
          })
        );
      };
      console.log($scope.weeks)
    });
    $scope.setPick = function(pickedGame) {
      console.log(pickedGame);
      // console.log(user);
      console.log($scope.translatePick(pickedGame))
      // $http.post('/api/users/' + user.id + '/picks', {
      //   user:
      //   game: game.id
      //   pick:
      // })
    };
    $scope.translatePick = function(translatedGame) {
      console.log("translated game: ", translatedGame);
      if (translatedGame.pick == 1) {
        return translatedGame.home;
      } else if (translatedGame.pick == 0) {
        return translatedGame.away;
      } else {
        return "You haven't made a pick yet.";
      }
    };
  })
  .controller('WeekShowCtrl', function ($scope, $http, $routeParams) {
    $http.get('/api/weeks/' + $routeParams.id).success(function(weekData) {
      $scope.games = weekData;
    });
  });


