app.controller('weighingsCtrl', function($scope, currentAuth, dataFactory) {
  //Make controller for both WO and WE that share the common stuff.
  $scope.userData = {
    account: [],
    weighings: [],
    newWeighings: {
      theDate: "",
      theWeight: "",
      theBF: "",
      theMuscle: "",
      theWater: "",
      theBones: ""
    },
    dateSelectors: {
      addWeighingDate: false
    }
  };

 $scope.chartData = {
    weighings: {
      labels: [],
      data: []
    }
  };


  var getUserData = function() {
    var today = new Date();

    $scope.userData.account = dataFactory.getAccountData(currentAuth.uid);
    $scope.userData.weighings = dataFactory.getWeighingData(currentAuth.uid);

    $scope.userData.newWeighings = {
      theDate: today.customFormat("#YYYY#-#MM#-#DD#")
    };

    $scope.userData.weighings.$loaded().then(function() {
      drawLineChart();
    })

  };

  getUserData();

  var drawLineChart = function() {
    $scope.chartData.weighings.labels = [];
    $scope.chartData.weighings.data = [[]];

    angular.forEach($scope.userData.weighings, function(value, key) {
      console
      $scope.chartData.weighings.labels.push(value.theWeighDate);
      $scope.chartData.weighings.data[0].push(value.theWeigh);
      //$scope.chartData.weighings.data[1].push(value.theBF);
      //$scope.chartData.weighings.data[2].push(value.theWater);
      //$scope.chartData.weighings.data[4].push(value.theMuscle);
      //$scope.chartData.weighings.data[5].push(value.theBones);
    });
  }


  $scope.addWeighing = function() {
    //function getTheWeek
    var newData = $scope.userData.newWeighings;
    var theWeighing = {
      theWeighDate: newData.theDate,
      theWeigh: newData.theWeight,
      theBF: newData.theBF,
      theMuscle: newData.theMuscle,
      theWater: newData.theWater,
      theBone: newData.theBones
    };
    dataFactory.addWeighingData(currentAuth.uid, theWeighing);
  };


  //Datepicker
  $scope.open = function($event, opened) {
    $scope.userData.dateSelectors[opened] = true;
  };



});