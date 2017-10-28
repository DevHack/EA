/* global app, angular, window */
app.controller('LandingCtrl', ['$scope', '$state', '$timeout', '$mdMedia', 'CONFIG', function LandingCtrl($scope, $state, $timeout, $mdMedia, CONFIG) {
  $scope.baseUrl = CONFIG.baseUrl;

  const transitionTime = 1000;

  const slideInBackground = function slideInBackground() {
    const goldBackground = angular.element(window.document.querySelector('.gold-background'));
    // Set the left value to just off the screen to the right
    goldBackground.css('left', `${window.outerWidth}px`);
    // We hide by default, so show the div
    goldBackground.css('display', 'block');
    $timeout(() => {
      // We have to async this part one cycle
      // otherwise transition kicks in for resetting the left attribute above
      goldBackground.css('transition', `left ${transitionTime}ms`);
      $timeout(() => {
        goldBackground.css('left', '30%');
      }, 10);
    });
  };

  $scope.next = function next() {
    // $timeout.cancel(timeoutPromise);
    if ($mdMedia('xs') || $mdMedia('sm')) {
      $state.go('form.basicInformation');
    } else {
      slideInBackground();
      $timeout(() => {
        // This timeout needs to match the transition value above
        $state.go('form.basicInformation');
      }, transitionTime);
    }
  };
}]);
