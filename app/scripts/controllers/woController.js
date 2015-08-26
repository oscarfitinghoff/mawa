angular.module('woApp')

.controller('woCtrl', function(currentAuth, $scope, dataFactory) {

  $scope.userData = {
    account: dataFactory.getAccountData(currentAuth.uid),
    workouts: dataFactory.getWorkoutData(currentAuth.uid),
    theActivities: [],
    theLocations: []
  };

  $scope.queryText = '';
  $scope.theDate = "2015-08-26";
  $scope.theLocation = undefined;
  $scope.theActivity = undefined;
  $scope.theDuration = "60min";
  $scope.theComment = "testing";


  $scope.userData.workouts.$loaded().then(function() {
    angular.forEach($scope.userData.workouts, function(value, key) {
      if($scope.userData.theActivities.indexOf(value.theActivity) == -1) {
        $scope.userData.theActivities.push(value.theActivity);
      }
      if($scope.userData.theLocations.indexOf(value.theLocation) == -1) {
        $scope.userData.theLocations.push(value.theLocation);
      }
    });
  });

  $scope.addWorkout = function() {
    //function getTheWeek
    var theWorkout = {
      theDate: $scope.theDate,
      theLocation: $scope.theLocation,
      theActivity: $scope.theActivity,
      theDuration: $scope.theDuration,
      theComment: $scope.theComment,
      theWeek: getTheWeek($scope.theDate)
    };
    dataFactory.addWorkoutData(currentAuth.uid, theWorkout);
  };

  var getTheWeek = function(theDate) {

    var oneDay = 1000*60*60*24;
    var workoutDate = new Date(theDate);
    var startDate = new Date($scope.userData.account.startWorkout);
    var diff = workoutDate.getTime() - startDate; //startDate GLOBAL VAR atm (in app.js)
    var theWeek = Math.ceil((diff/oneDay)/7);
    return theWeek;
  }
});