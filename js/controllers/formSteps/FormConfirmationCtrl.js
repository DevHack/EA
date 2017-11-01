/* global app */

function FormConfirmationCtrl($scope, $state, FormDataFactory, FormApiFactory, FormHelperFactory) {
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

    $scope.next = function next() {
        $scope.loading = true;
        FormDataFactory.setCompleted(true);
        FormDataFactory.setNeedsEnrollmentSupport($scope.under22AndMissingRecommendedCourses());
        FormApiFactory.updateLearnerApplication().then(() => {
            $scope.loading = false;
            $scope.$emit('allowState', 'completed');
            $state.go('^.completed');
        });
    };
}

FormConfirmationCtrl.$inject = ['$scope', '$state', 'FormDataFactory', 'FormApiFactory', 'FormHelperFactory'];
export default FormConfirmationCtrl;