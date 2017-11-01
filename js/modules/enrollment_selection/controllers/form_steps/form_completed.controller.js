/* global app */
function FormCompletedCtrl($scope, UtilService, FormService) {
    $scope.form = FormService._formData.getData();
    $scope.userAge = FormService._formData.getUserAge();
    $scope.availableCourses = FormService._formData.getAvailableCourses();

    // Create a map of courses
    $scope.availableCoursesMap = {};
    for (let i = 0, length = $scope.availableCourses.length; i < length; i++) {
        $scope.availableCoursesMap[$scope.availableCourses[i].courseId] = $scope.availableCourses[i];
    }

    $scope.under22AndMissingRecommendedCourses = function under22AndMissingRecommendedCourses() {
        return UtilService.under22AndMissingRecommendedCourses($scope.form, $scope.userAge, $scope.availableCourses);
    };
}
FormCompletedCtrl.$inject = ['$scope', 'UtilService', 'FormService'];
export default FormCompletedCtrl;
