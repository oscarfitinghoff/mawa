app.factory("Auth", ["$firebaseAuth", function($firebaseAuth) {
  var ref = new Firebase("https://mawa.firebaseio.com");
  return $firebaseAuth(ref);
}]);