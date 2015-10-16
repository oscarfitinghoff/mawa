app.factory('dataFactory', ['$firebaseArray', '$firebaseObject', function($firebaseArray, $firebaseObject) {

  return {
    getAccountData: function(user) {
      var ref = new Firebase('https://mawa.firebaseio.com/users/' + user + '/account');
      return $firebaseObject(ref);
    },
    getWorkoutData: function(user) {
      var ref = new Firebase('https://mawa.firebaseio.com/users/' + user + '/workouts');
      return $firebaseArray(ref);
    },
    addWorkoutData: function(user, theWorkout) {
      var ref = new Firebase('https://mawa.firebaseio.com/users/' + user + '/workouts');
      var data = $firebaseArray(ref);
      data.$add(theWorkout).then(function(data) {
        var id = data.key();
        console.log("added record with id " + id);
      });
    },
    getWeighingData: function(user) {
      var ref = new Firebase('https://mawa.firebaseio.com/users/' + user + '/weigh');
      return $firebaseArray(ref);
    },
    addWeighingData: function(user, theWeigh) {
      var ref = new Firebase('https://mawa.firebaseio.com/users/' + user + '/weigh');
      var data = $firebaseArray(ref);
      data.$add(theWeigh).then(function(data) {
        var id = data.key();
        console.log("added record with id " + id);
      });
    }
  }
}]);