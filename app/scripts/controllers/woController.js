app.controller('woCtrl', function(currentAuth, $scope, dataFactory) {
  
  //UserData structure
  $scope.userData = {
    account: [],
    workouts: [],
    theActivities: [],
    theLocations: [],
    newWorkout: {
      theDate: "",
      theLocation: "",
      theActivity: "",
      theDuration: "",
      theComment: ""
    },
    filterWO: {
      fromDate: "",
      toDate: "",
      activity: "",
      location: ""
    },
    dateSelectors: {
      addWorkoutDate: false,
      filterFromDate: false,
      filterToDate: false
    },
    workoutStats: {
      workoutsPerWeek: ""
    }
  }

  var getUserData = function() {
    var today = new Date();
    $scope.userData.account = dataFactory.getAccountData(currentAuth.uid);
    $scope.userData.workouts = dataFactory.getWorkoutData(currentAuth.uid);

    $scope.userData.newWorkout = {
      theDate: today.customFormat("#YYYY#-#MM#-#DD#")
    };

    $scope.userData.account.$loaded().then(function() {
      if($scope.userData.filterWO.fromDate === "") {
        var startDate = new Date($scope.userData.account.startWorkout);
        $scope.userData.filterWO.fromDate = startDate.customFormat("#YYYY#-#MM#-#DD#");
      }
      if($scope.userData.filterWO.toDate === "") {
        //var today = new Date();
        $scope.userData.filterWO.toDate = today.customFormat("#YYYY#-#MM#-#DD#");
      }
    });

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
  }

  getUserData();

  $scope.addWorkout = function() {
    //function getTheWeek
    var newData = $scope.userData.newWorkout;
    var theWorkout = {
      theDate: newData.theDate,
      theLocation: newData.theLocation,
      theActivity: newData.theActivity,
      theDuration: newData.theDuration,
      theComment: newData.theComment,
      theWeek: getTheWeek(newData.theDate)
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
  
  //Datepicker
  $scope.open = function($event, opened) {
    $scope.userData.dateSelectors[opened] = true;
  };
});