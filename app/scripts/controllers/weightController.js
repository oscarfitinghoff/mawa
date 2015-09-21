app.controller('weightCtrl', ['$scope', '$firebaseArray', 'currentAuth', function($scope, $firebaseArray, currentAuth) {
  var ref = new Firebase('https://mawa.firebaseio.com/users/' + currentAuth.uid + '/weigh');
  $scope.data = $firebaseArray(ref);

  $scope.userData = {
    weighs: $firebaseArray(ref)
  };


}]);