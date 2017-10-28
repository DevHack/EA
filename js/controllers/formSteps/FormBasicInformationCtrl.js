/* global app, window */
app.controller('FormBasicInformationCtrl', ['$scope', '$state', '$q', '$mdDialog', 'FormDataFactory', 'FormApiFactory', 'FormHelperFactory', function FormBasicInformationCtrl($scope, $state, $q, $mdDialog, FormDataFactory, FormApiFactory, FormHelperFactory) {
  $scope.form = FormDataFactory.getData();

  $scope.next = function next(event, basicInformationForm) {
    if (basicInformationForm.$valid) {
      $scope.loading = true;
      FormDataFactory.setBasicInformation($scope.form);
      const createLearnerApplicationPromise = FormApiFactory.createLearnerApplication();
      const getDegreesPromise = FormApiFactory.getDegrees();

      $q.all([createLearnerApplicationPromise, getDegreesPromise]).then((data) => {
        FormDataFactory.setId(data[0].id);
        FormDataFactory.setUserAge(data[0].ageAtTimeOfSurvey);
        FormDataFactory.setAvailableDegrees(data[1]);
        FormHelperFactory.preloadDegreeImages(data[1]);
        $scope.loading = false;
        $scope.$emit('allowState', 'degreeSelection');
        $state.go('^.degreeSelection');
      }, () => {
        $scope.loading = false;
        $mdDialog.show(
          $mdDialog.alert()
            .parent(window.document.body)
            .clickOutsideToClose(true)
            .textContent('We seem to be experiencing some issues. Please try again in a moment!')
            .ariaLabel('We are experiencing some issues')
            .ok('Okay!')
            .targetEvent(event),
        );
      });
    }
  };
}]);
