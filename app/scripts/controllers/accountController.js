app.controller('accCtrl', function(currentAuth, dataFactory, $scope) {

  $scope.userData = {
    account: []
  };

  var getUserData = function() {
    $scope.userData.account = dataFactory.getAccountData(currentAuth.uid);
    $scope.userData.account.$loaded().then(function() {
      var startDate = new Date($scope.userData.account.startWorkout);
      $scope.userData.account.startWorkout = startDate.customFormat("#YYYY#-#MM#-#DD#");
    });
  };

  getUserData();


  $scope.changePass = function() {
  };
});