angular.module('woApp')

.controller('mainCtrl', ['$scope', 'Auth', function($scope, Auth) {
  Auth.$onAuth(function(authData) {
    if(authData) {
      $scope.authData = authData;
      console.log(authData.uid);  
    }
  });
}]);