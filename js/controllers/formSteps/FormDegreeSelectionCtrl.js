/* global app, window */
app.controller('FormDegreeSelectionCtrl', ['$scope', '$state', '$q', '$mdDialog', 'FormDataFactory', 'FormApiFactory', function FormDegreeSelectionCtrl($scope, $state, $q, $mdDialog, FormDataFactory, FormApiFactory) {
  $scope.availableDegrees = FormDataFactory.getAvailableDegrees();

  const findDegree = function findDegree(degreeName) {
    for (let i = 0, length = $scope.availableDegrees.length; i < length; i++) {
      if ($scope.availableDegrees[i].degreeName === degreeName) {
        return $scope.availableDegrees[i];
      }
    }
    return false;
  };

  $scope.selectDegree = function selectDegree(degreeName) {
    $scope.activeDegree = findDegree(degreeName);
  };

  $scope.next = function next(event) {
    if (!$scope.activeDegree) {
      $mdDialog.show(
        $mdDialog.alert()
          .parent(window.document.body)
          .clickOutsideToClose(true)
          .textContent('Please select your academic interest.')
          .ariaLabel('Alert Dialog Demo')
          .ok('Okay!')
          .targetEvent(event),
      );
      return false;
    }
    $scope.loading = true;
    FormDataFactory.setDegree($scope.activeDegree.degreeId);
    const updateLearnerApplicationPromise = FormApiFactory.updateLearnerApplication();
    const getCoursesByApplicationDegreeIdPromise = FormApiFactory.getCoursesByApplicationDegreeId($scope.activeDegree.applicationDegreeId);
    $q.all([updateLearnerApplicationPromise, getCoursesByApplicationDegreeIdPromise])
      .then((data) => {
        FormDataFactory.setAvailableCourses(data[1]);
        $scope.loading = false;
        $scope.$emit('allowState', 'courseList');
        $state.go('^.courseList');
      });
    return true;
  };
}]);
