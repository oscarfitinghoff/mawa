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
      location: "",
      numOfWorkouts: {

      }
    },
    dateSelectors: {
      addWorkoutDate: false,
      filterFromDate: false,
      filterToDate: false
    },
    workoutStats: {
      workoutsPerWeek: "",
      numOfWorkouts: {

      }
    }
  }
  $scope.labels = [];
  $scope.data = [];

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

    var obj = {};
    $scope.userData.workouts.$loaded().then(function() {
      angular.forEach($scope.userData.workouts, function(value, key) {

        numberOfWorkouts(false, obj, value);

        if($scope.userData.theActivities.indexOf(value.theActivity) == -1) {
          $scope.userData.theActivities.push(value.theActivity);
        }
        if($scope.userData.theLocations.indexOf(value.theLocation) == -1) {
          $scope.userData.theLocations.push(value.theLocation);
        }

        //Do dashboard stuff here so I don't have to look through it again?
        //calcWorkoutData(value);
      });
      obj = {};
      drawPieChart();

    });
  }

  getUserData();
  //Gör snyggare
  var numberOfWorkouts = function(flag, obj, workout) {
    if(!obj.hasOwnProperty(workout.theActivity)) {
      obj[workout.theActivity] = 1;
    } else {
      obj[workout.theActivity]++;
    }
    if(!flag) {
      $scope.userData.workoutStats.numOfWorkouts = obj;
    } else {
      $scope.userData.filterWO.numOfWorkouts = obj;
    }
  };

  var calcWorkoutData = function(workout) {

  }

  $scope.$watchGroup(['userData.filterWO.fromDate', 'userData.filterWO.toDate', 'userData.filterWO.activity', 'userData.filterWO.location'], function() {
    var obj = {};
    angular.forEach($scope.filtered, function(value, key) {
      numberOfWorkouts(true, obj, value);
    });
    obj = {};
    reDrawPieChart();
  });
  //make it one function instead of 2
  var drawPieChart = function() {
    $scope.labels = [];
    $scope.data = [];

    angular.forEach($scope.userData.workoutStats.numOfWorkouts, function(value, key) {
      $scope.labels.push(key);
      $scope.data.push(value);
    }); 
  }
  var reDrawPieChart = function() {
    $scope.labels = [];
    $scope.data = [];

    if($scope.filtered.length !== 0) {
      angular.forEach($scope.userData.filterWO.numOfWorkouts, function(value, key) {
        $scope.labels.push(key);
        $scope.data.push(value);
      });
    }
  }
  $scope.resetFilter = function() {
    $scope.labels.push("key");
    $scope.data.push(50);
    console.log($scope.labels);
  }
  

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
    var diff = workoutDate.getTime() - startDate;
    var theWeek = Math.ceil((diff/oneDay)/7);
    return theWeek;
  }
  
  //Datepicker
  $scope.open = function($event, opened) {
    $scope.userData.dateSelectors[opened] = true;
  };


  
});