angular.module('woApp')

.factory('dataFactory', ['$firebaseObject', function($firebaseObject) {

  return {
    getAccountData: function(user) {
      var ref = new Firebase('https://raxworkout.firebaseio.com/users/' + user + '/account');
      var temp = $firebaseObject(ref);
      var obj = {};
      temp.$loaded().then(function() {
        obj.email = temp.email;
        obj.startWorkout = temp.startWorkout;
      });
      return obj;
    },
    getWorkoutData: function(user) {
      var ref = new Firebase('https://raxworkout.firebaseio.com/users/' + user + '/workouts');
      return $firebaseObject(ref);
    },
    getWeighingData: function(user) {
      var ref = new Firebase('https://raxworkout.firebaseio.com/users/' + user + '/weigh');
      return $firebaseObject(ref);
    }
  }
}]);



