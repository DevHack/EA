/* global app, window */
function FormDegreeSelectionCtrl($scope, $state, $q, $mdDialog, FormService) {
    $scope.availableDegrees = FormService._formData.getAvailableDegrees();

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
        FormService._formData.setDegree($scope.activeDegree.degreeId);
        const updateLearnerApplicationPromise = FormService.updateLearnerApplication();
        const getCoursesByApplicationDegreeIdPromise = FormService.getCoursesByApplicationDegreeId($scope.activeDegree.applicationDegreeId);
        $q.all([updateLearnerApplicationPromise, getCoursesByApplicationDegreeIdPromise])
            .then((data) => {
                FormService._formData.setAvailableCourses(data[1]);
                $scope.loading = false;
                $scope.$emit('allowState', 'courseList');
                $state.go('^.courseList');
            });
        return true;
    };
}
FormDegreeSelectionCtrl.$inject = ['$scope', '$state', '$q', '$mdDialog', 'FormService'];
export default FormDegreeSelectionCtrl;
