app.controller('weighingsCtrl', ['$scope', '$firebaseArray', 'currentAuth', function($scope, currentAuth, dataFactory) {
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

  }
}]);