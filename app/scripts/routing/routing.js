angular.module('woApp')

.run(["$rootScope", "$state", function($rootScope, $state) {
  $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
    // We can catch the error thrown when the $requireAuth promise is rejected
    // and redirect the user back to the home page
    if (error === "AUTH_REQUIRED") {
      $state.go("home");
    }
  });
}])


.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/home");

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'views/login.html',
      controller: 'loginCtrl'
    })
    .state('account', {
      url: '/account',
      templateUrl: 'views/account.html',
      controller: 'accCtrl',
      resolve: {
        // controller will not be loaded until $requireAuth resolves
        // Auth refers to our $firebaseAuth wrapper in the example above
        "currentAuth": ["Auth", function(Auth) {
          // $requireAuth returns a promise so the resolve waits for it to complete
          // If the promise is rejected, it will throw a $stateChangeError (see above)
          return Auth.$requireAuth();
        }]
      }
    })
    .state('workouts', {
      url: '/workouts',
      templateUrl: 'views/workouts.html',
      controller: 'woCtrl',
      resolve: {
        // controller will not be loaded until $requireAuth resolves
        // Auth refers to our $firebaseAuth wrapper in the example above
        "currentAuth": ["Auth", function(Auth) {
          // $requireAuth returns a promise so the resolve waits for it to complete
          // If the promise is rejected, it will throw a $stateChangeError (see above)
          return Auth.$requireAuth();
        }]
      }
    })
    .state('weighings', {
      url: '/weighings',
      templateUrl: 'views/weighings.html',
      controller: 'weightCtrl',
      resolve: {
        // controller will not be loaded until $requireAuth resolves
        // Auth refers to our $firebaseAuth wrapper in the example above
        "currentAuth": ["Auth", function(Auth) {
          // $requireAuth returns a promise so the resolve waits for it to complete
          // If the promise is rejected, it will throw a $stateChangeError (see above)
          return Auth.$requireAuth();
        }]
      } 
    })
    .state('logout', {
      url: 'logout',
      controller: function($state, Auth) {
        Auth.$unauth();
        $state.go('home');
      }
    })
});