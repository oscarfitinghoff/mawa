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
      avgWorkoutsPerWeek: "",
      workoutsPerWeek: {

      },
      numOfWorkouts: {

      }
    }
  }

  $scope.chartData = {
    distribution: {
      labels: [],
      data: []
    },
    workoutsPerWeek: {
      labels: [],
      data: [[]]
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
        $scope.userData.filterWO.toDate = today.customFormat("#YYYY#-#MM#-#DD#");
      }
    });

    $scope.userData.workouts.$loaded().then(function() {
      var NOWobj = {};
      var WPWobj = {};
      angular.forEach($scope.userData.workouts, function(value, key) {

        //For piechart, distribution
        numberOfWorkouts(NOWobj, value);
        //For line chart, workouts per week
        workoutsPerWeek(WPWobj, value);

        //For autocomplete
        if($scope.userData.theActivities.indexOf(value.theActivity) == -1) {
          $scope.userData.theActivities.push(value.theActivity);
        }
        if($scope.userData.theLocations.indexOf(value.theLocation) == -1) {
          $scope.userData.theLocations.push(value.theLocation);
        }

        //Do dashboard stuff here so I don't have to look through it again?
        //calcWorkoutData(value);
      });
      $scope.userData.workoutStats.numOfWorkouts = NOWobj;
      $scope.userData.workoutStats.workoutsPerWeek = WPWobj;
      NOWobj = {};
      WPWobj = {};

      //Put this in the corresponding data gathering function?
      drawPieChart();
      drawLineChart();
    });
  };

  getUserData();
  //Gör snyggare
  var numberOfWorkouts = function(obj, workout) {
    if(!obj.hasOwnProperty(workout.theActivity)) {
      obj[workout.theActivity] = 1;
    } else {
      obj[workout.theActivity]++;
    }
  };
  //Must include weeks with no workout
  var workoutsPerWeek = function(obj, workout) {
    if(!obj.hasOwnProperty(workout.theWeek)) {
      obj[workout.theWeek] = 1;
    } else {
      obj[workout.theWeek]++;
    }
  }

  $scope.$watchGroup(['userData.filterWO.fromDate', 'userData.filterWO.toDate', 'userData.filterWO.activity', 'userData.filterWO.location'], function() {
    var NOWobj = {};
    var WPWobj = {};
    angular.forEach($scope.filtered, function(value, key) {
      numberOfWorkouts(NOWobj, value);
      workoutsPerWeek(WPWobj, value);
    });
    $scope.userData.filterWO.numOfWorkouts = NOWobj;
    $scope.userData.filterWO.workoutsPerWeek = WPWobj;
    NOWobj = {};
    WPWobj = {};
    //Must i destroy old chart?
    reDrawPieChart();
    reDrawLineChart();
  });







  var drawLineChart = function() {
    $scope.chartData.workoutsPerWeek.labels = [];
    $scope.chartData.workoutsPerWeek.data = [[]];

    angular.forEach($scope.userData.workoutStats.workoutsPerWeek, function(value, key) {
      $scope.chartData.workoutsPerWeek.labels.push(key);
      $scope.chartData.workoutsPerWeek.data[0].push(value);
    });
  }
  var reDrawLineChart = function() {
    $scope.chartData.workoutsPerWeek.labels = [];
    $scope.chartData.workoutsPerWeek.data = [[]];

    if($scope.filtered.length !== 0) {
      angular.forEach($scope.userData.filterWO.workoutsPerWeek, function(value, key) {
        $scope.chartData.workoutsPerWeek.labels.push(key);
        $scope.chartData.workoutsPerWeek.data[0].push(value);
      });
    }
  }











  //make it one function instead of 2
  var drawPieChart = function() {
    $scope.chartData.distribution.labels = [];
    $scope.chartData.distribution.data = [];

    angular.forEach($scope.userData.workoutStats.numOfWorkouts, function(value, key) {
      $scope.chartData.distribution.labels.push(key);
      $scope.chartData.distribution.data.push(value);
    }); 
  }
  var reDrawPieChart = function() {
    $scope.chartData.distribution.labels = [];
    $scope.chartData.distribution.data = [];

    if($scope.filtered.length !== 0) {
      angular.forEach($scope.userData.filterWO.numOfWorkouts, function(value, key) {
        $scope.chartData.distribution.labels.push(key);
        $scope.chartData.distribution.data.push(value);
      });
    }
  }

  $scope.resetFilter = function() {
    //Dublicate stuff...

    var startDate = new Date($scope.userData.account.startWorkout);
    $scope.userData.filterWO.fromDate = startDate.customFormat("#YYYY#-#MM#-#DD#");
    $scope.userData.filterWO.toDate = today.customFormat("#YYYY#-#MM#-#DD#");


    // $scope.userData.filterWO.activity: ""
    //   location: "",
    //   numOfWorkouts: {

    //   }
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