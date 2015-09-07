app.controller('selectDateCtrl', function($scope) {

  $scope.status = {
    opened: false
  };

  var setFilterWOStartDate = function($event) {
    $scope.status.opened = true;
  };
});