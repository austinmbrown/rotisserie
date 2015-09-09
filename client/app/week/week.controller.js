'use strict';

angular.module('rotisserieApp')
  .controller('WeekCtrl', function ($scope, $http, Auth, User) {
    $scope.weekSelection = thisweek;
    $scope.weeks = {};
    var user = Auth.getCurrentUser();
    console.log(user._id);

    $scope.setPick = function(pickedGame, pickedTeam, pickId) {
      pickedGame.pick.pick = pickedTeam;
      if (pickId) {
        $http.put('/api/users/' + user._id + '/picks/' + pickId, {
          pick: pickedTeam
        });
      } else {
        $http.post('/api/users/' + user._id + '/picks', {
          user: user._id,
          game: pickedGame.id,
          pick: pickedTeam
        }).success(function(newPick) {
          pickedGame.pick = newPick;
        });
      };
    };

    $scope.$watch('weekSelection', function(){
      console.log("week changed", $scope.weekSelection);
      $http.get('api/weeks/' + $scope.weekSelection + "/" + user._id).success(function(weekData) {
        $scope.weeks[$scope.weekSelection - 1] = weekData;
      })
    })
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


