/* global app */

function FormConfirmationCtrl($scope, $state, FormService, UtilService) {
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

    $scope.next = function next() {
        $scope.loading = true;
        FormService._formData.setCompleted(true);
        FormService._formData.setNeedsEnrollmentSupport($scope.under22AndMissingRecommendedCourses());
        FormService.updateLearnerApplication().then(() => {
            $scope.loading = false;
            $scope.$emit('allowState', 'completed');
            $state.go('^.completed');
        });
    };
}

FormConfirmationCtrl.$inject = ['$scope', '$state', 'FormService', 'UtilService'];
export default FormConfirmationCtrl;