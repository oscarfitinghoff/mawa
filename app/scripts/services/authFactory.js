angular.module('woApp')

.factory("Auth", ["$firebaseAuth", function($firebaseAuth) {
  var ref = new Firebase("https://raxworkout.firebaseio.com");
  return $firebaseAuth(ref);
}]);