app.filter('woFilter', function() {
  return function(workouts, filterWO) {
    var filteredWorkouts = [];
    
    angular.forEach(workouts, function(workout) {
      var activity = filterWO.activity || "";
      var location = filterWO.location || "";

      if((workout.theDate >= filterWO.fromDate && workout.theDate <= filterWO.toDate) && 
         (workout.theActivity.toLowerCase().indexOf(activity.toLowerCase()) + 1) && 
         (workout.theLocation.toLowerCase().indexOf(location.toLowerCase()) + 1)) {
        filteredWorkouts.push(workout);
      }
    });
    return filteredWorkouts;
  };
});