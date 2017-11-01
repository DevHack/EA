/* global app */

function FormCompleteApplicationCtrl($scope, $state, FormService) {
    $scope.form = FormService._formData.getData();

    $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY International').split(' ').map(state => ({ abbrev: state }));

    $scope.next = function next(completeApplicationForm) {
        if (completeApplicationForm.$valid) {
            $scope.loading = true;
            FormService._formData.setCompleteApplication($scope.form);
            FormService.updateLearnerApplication().then(() => {
                $scope.loading = false;
                $scope.$emit('allowState', 'confirmation');
                $state.go('^.confirmation');
            });
        }
    };
}

FormCompleteApplicationCtrl.$inject = ['$scope', '$state', 'FormService'];
export default FormCompleteApplicationCtrl;
