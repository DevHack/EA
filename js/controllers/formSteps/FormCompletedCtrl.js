/* global app */
app.controller('FormCompletedCtrl', ['$scope', '$state', 'FormDataFactory', 'FormApiFactory', 'FormHelperFactory', function FormCompletedCtrl($scope, $state, FormDataFactory, FormApiFactory, FormHelperFactory) {
  $scope.form = FormDataFactory.getData();
  $scope.userAge = FormDataFactory.getUserAge();
  $scope.availableCourses = FormDataFactory.getAvailableCourses();

  // Create a map of courses
  $scope.availableCoursesMap = {};
  for (let i = 0, length = $scope.availableCourses.length; i < length; i++) {
    $scope.availableCoursesMap[$scope.availableCourses[i].courseId] = $scope.availableCourses[i];
  }

  $scope.under22AndMissingRecommendedCourses = function under22AndMissingRecommendedCourses() {
    return FormHelperFactory.under22AndMissingRecommendedCourses($scope.form, $scope.userAge, $scope.availableCourses);
  };
}]);
