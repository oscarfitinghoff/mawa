angular.module('woApp')

.factory('dataFactory', ['$firebaseArray', function($firebaseArray) {

  return {
    getAccountData: function(user) {
      var ref = new Firebase('https://raxworkout.firebaseio.com/users/' + user + '/account');
      var temp = $firebaseArray(ref);
      var obj = {};
      temp.$loaded().then(function() {
        obj.email = temp[0].$value;
        obj.startWorkout = temp[1].$value;
        temp = [];
      });
      return obj;
    },
    getWorkoutData: function(user) {
      var ref = new Firebase('https://raxworkout.firebaseio.com/users/' + user + '/workouts');
      return $firebaseArray(ref);
    },
    addWorkoutData: function(user, theWorkout) {
      var ref = new Firebase('https://raxworkout.firebaseio.com/users/' + user + '/workouts');
      var data = $firebaseArray(ref);
      data.$add(theWorkout).then(function(data) {
        var id = data.key();
        console.log("added record with id " + id);
      });
    },
    getWeighingData: function(user) {
      var ref = new Firebase('https://raxworkout.firebaseio.com/users/' + user + '/weigh');
      return $firebaseArray(ref);
    }
  }
}]);