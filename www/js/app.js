// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('forms', ['ionic', 'firebase'])
  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  // route to show our basic form (/form)
    .state('form', {
    url: '/form/:item',
    templateUrl: 'form.html',
    controller: 'FormCtrl',
  });
  $urlRouterProvider.otherwise('/form/');
})


.controller('FormCtrl', function($scope, $stateParams, Stack, $firebaseObject) {
  $scope.formData={};
  var ref = new Firebase("https://sandboxforms.firebaseio.com/data/0/");
  var data = $firebaseObject(ref);
  data.$bindTo($scope, "formData");
  $scope.cards = Stack;
  $scope.phase = 0;
  $scope.prev = null;
  $scope.nextPage = function() {
    $scope.prev = $scope.phase;
    $scope.phase = $scope.phase + 1;
  };
  $scope.prevPage = function() {
    $scope.phase = $scope.prev;
  };
})

.factory('Stack', [ /*'<dependency>', */ function() {
  return [{
      id: 0,
      title: 'Arrived',
      next: '1',
      inputList: [{
          label: 'email',
          type: 'email',
          name: 'userEmail'
        }, {
          label: 'website',
          type: 'url',
          name: 'userSite'
        }, {
          label: 'Home Phone number',
          type: 'tel',
          name: 'home',
        }, {
          label: 'Cell Phone number',
          type: 'tel',
          name: 'cell',
        }, {
          label: 'Favorite Number',
          type: 'number',
          name: 'fav',
        }, {
          label: 'Time',
          type: 'time',
          name: 'time'
        }, {
          label: 'Birthday',
          type: 'date',
          name: 'dob'
        }] //end inputs
    }, //end first card
    {
      id: 1,
      title: '',
      inputList: [{
        label: 'username',
        type: 'text',
        name: 'username'
      }]
    }
  ];
}])


.filter('titlecase', [function() {
  return function(input) {
    var smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;
    input = input.toLowerCase();
    return input.replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, function(match, index, title) {
      if (index > 0 && index + match.length !== title.length &&
        match.search(smallWords) > -1 && title.charAt(index - 2) !== ":" &&
        (title.charAt(index + match.length) !== '-' || title.charAt(index - 1) === '-') &&
        title.charAt(index - 1).search(/[^\s-]/) < 0) {
        return match.toLowerCase();
      }
      if (match.substr(1).search(/[A-Z]|\../) > -1) {
        return match;
      }
      return match.charAt(0).toUpperCase() + match.substr(1);
    });
  };
}]);
