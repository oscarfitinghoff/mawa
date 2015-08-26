angular.module('woApp')

.controller('woCtrl', function(currentAuth, $scope, $firebaseObject, $firebaseArray, dataFactory) {

  $scope.common = {
    theActivities: [],
    theLocations: []
  };
  $scope.queryText = '';
  $scope.theDate = "2020-10-10";
  $scope.theLocation = undefined;
  $scope.theActivity = undefined;
  $scope.theDuration = "60min";
  $scope.theComment = "testing";

  $scope.userData = {
    workouts: dataFactory.getWorkoutData(currentAuth.uid)
  };

  var someData = dataFactory.getWorkoutData(currentAuth.uid);
  $scope.userData.workouts.$loaded().then(function() {
    angular.forEach($scope.userData.workouts, function(value, key) {
      if($scope.common.theActivities.indexOf(value.theActivity) == -1) {
        $scope.common.theActivities.push(value.theActivity);
      }
      var temp = value;

      if(temp.theWeek === undefined) {
        console.log("No week: " + key);
      } 
      someData.$save(temp);
        
      //Same for location when that is implementet all over
    });
  });
  //ADD!!!
  // var obj = $firebaseArray(ref);
  // $scope.obj = obj;
  // $scope.addWorkout = function() {
  //   obj.$add({
  //     theDate: $scope.theDate,
  //     theLocation: $scope.theLocation,
  //     theActivity: $scope.theActivity,
  //     theDuration: $scope.theDuration,
  //     theComment: $scope.theComment
  //   }).then(function(ref) {
  //     ref.key() === obj.$id;
  //     console.log(ref.key(), obj.$id);
  //   }, function(error) {
  //     console.log("Error:", error);
  //   });
  // };


  $scope.reStructure = function() {
     
  }
});