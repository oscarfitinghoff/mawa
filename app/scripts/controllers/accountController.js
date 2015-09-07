app.controller('accCtrl', function(currentAuth, dataFactory, $scope) {
  //console.log(currentAuth.uid)
  $scope.userData = {
    account: dataFactory.getAccountData(currentAuth.uid)
  }
  
  // return $scope.userData = {
  //   user: {
  //     email: temp[0].email,
  //     startWorkout: temp[0].startWorkout
  //   },
  //   weigh: temp[1],
  //   workouts: temp[2]
  // };
  // console.log($scope.userData);
  // });
  

});