/* global app, angular, window */
import angular from "angular";

function FormCourseListCtrl($scope, $state, $mdDialog, FormDataFactory, FormApiFactory) {
    $scope.form = FormDataFactory.getData();
    $scope.userAge = FormDataFactory.getUserAge();
    $scope.availableCourses = FormDataFactory.getAvailableCourses();
    let requiredNumberOfCourses;
    if ($scope.userAge < 22) {
        requiredNumberOfCourses = $scope.$parent.applicationOptions.age21AndUnderCoursesRequired;
        for (let i = 0, length = $scope.availableCourses.length; i < length; i++) {
            if (i < 8) {
                $scope.availableCourses[i].recommended = true;
            }
        }
    } else {
        requiredNumberOfCourses = $scope.$parent.applicationOptions.age22AndOverCoursesRequired;
    }

    $scope.selectedCourseIds = {};
    // If we already have saved courseIds in the form array, then populate our model
    if ($scope.form.selectedCourseIds && $scope.form.selectedCourseIds.length > 0) {
        for (let i = 0, length = $scope.form.selectedCourseIds.length; i < length; i++) {
            $scope.selectedCourseIds[$scope.form.selectedCourseIds[i]] = true;
        }
    } else if (!$scope.form.selectedCourseIds || $scope.form.selectedCourseIds.length === 0) {
        // None selected yet, so preselect the four recommended courses
        for (let i = 0, length = $scope.availableCourses.length; i < length; i++) {
            if ($scope.availableCourses[i].recommended) {
                $scope.selectedCourseIds[$scope.availableCourses[i].courseId] = true;
            }
        }
    }

    $scope.setTooltip = function setTooltip(course) {
        $scope.tooltipTitle = course.courseName;
        $scope.tooltip = course.courseTooltip;
    };

    $scope.clearTooltip = function clearTooltip() {
        $scope.tooltipTitle = null;
        $scope.tooltip = null;
    };

    $scope.validNumberOfCourses = function validNumberOfCourses() {
        let selectedCourses = 0;
        angular.forEach($scope.selectedCourseIds, (value) => {
            if (value) {
                selectedCourses += 1;
            }
        });
        if (selectedCourses < requiredNumberOfCourses) {
            return false;
        }
        return true;
    };

    $scope.next = function next(event, form) {
        // Take our model checkbox data and put it in an array
        $scope.form.selectedCourseIds = [];
        angular.forEach($scope.selectedCourseIds, (value, key) => {
            if (value) {
                $scope.form.selectedCourseIds.push(key);
            }
        });
        if (form.$valid) {
            if (!$scope.fullList && ($scope.form.addMoreCourses === 'Yes' || $scope.form.selectedCourseIds.length < requiredNumberOfCourses)) {
                $scope.shortListSelectedCourseIds = angular.copy($scope.selectedCourseIds);
                $scope.fullList = true;
            } else if (!$scope.validNumberOfCourses()) {
                // User hasn't selected enough courses
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(window.document.body)
                        .clickOutsideToClose(true)
                        .textContent(`You have to select at least ${requiredNumberOfCourses} courses to continue.`)
                        .ariaLabel(`You have to select at least ${requiredNumberOfCourses} courses to continue.`)
                        .ok('Okay!')
                        .targetEvent(event),
                );
            } else {
                // We're either saving directly after the short list, or saving after the full list
                $scope.loading = true;
                FormDataFactory.setCourses($scope.form);
                FormApiFactory.updateLearnerApplication().then(() => {
                    $scope.loading = false;
                    $scope.$emit('allowState', 'completeApplication');
                    $state.go('^.completeApplication');
                });
            }
        }
    };
}

FormCourseListCtrl.$inject = ['$scope', '$state', '$mdDialog', 'FormDataFactory', 'FormApiFactory'];
export default  FormCourseListCtrl;
