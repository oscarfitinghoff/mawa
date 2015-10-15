app.controller("loginCtrl", ["$scope", "Auth", '$state', function($scope, Auth, $state) {
  
  var authData = Auth.$getAuth();
  if (authData) {
    $state.go('startPage');
  }

  $scope.loginError = false;
  $scope.login = function() {
    Auth.$authWithPassword({
      email: $scope.user.email,
      password: $scope.user.password
    }).then(function(authData) {
      $state.go('startPage');
    }).catch(function(error) {
      console.error(error);
      $scope.loginError = true;
    });
  };
}]);