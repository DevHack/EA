/* global app, window */

function FormBasicInformationCtrl($scope, $state, $q, $mdDialog, FormService, UtilService) {
    $scope.form = FormService._formData.getData();

    $scope.next = function next(event, basicInformationForm) {
        if (basicInformationForm.$valid) {
            $scope.loading = true;
            FormService._formData.setBasicInformation($scope.form);
            const createLearnerApplicationPromise = FormService.createLearnerApplication();
            const getDegreesPromise = FormService.getDegrees();

            $q.all([createLearnerApplicationPromise, getDegreesPromise]).then((data) => {
                FormService._formData.setId(data[0].id);
                FormService._formData.setUserAge(data[0].ageAtTimeOfSurvey);
                FormService._formData.setAvailableDegrees(data[1]);
                UtilService.preloadDegreeImages(data[1]);
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
}

FormBasicInformationCtrl.$inject = ['$scope', '$state', '$q', '$mdDialog', 'FormService', 'UtilService'];
export default  FormBasicInformationCtrl;
