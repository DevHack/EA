/* global app */

function FormCtrl($scope, $rootScope, $state, $mdSidenav, $mdMedia, CONFIG) {
    $scope.baseUrl = CONFIG.baseUrl;

    // This is a local cached copy of: https://tlbzufb3z4.execute-api.us-east-1.amazonaws.com/QA/gfa/ea-applications?recId=a0b41000005Lk1v
    $scope.applicationOptions = { whichDescribesYourHSEducation: 'Currently in high school;Graduated high school;Have GED;No GED', sfdcToken: null, sfdcHostname: null, page1RightPanelCopy: 'Our mission is to help individuals achieve college readiness and create a track into ASU.', name: 'EA Application 1', isActive: 'true', id: 'a0b41000005Lk1vAAC', age22AndOverCoursesRequired: 4, age21AndUnderCoursesRequired: 8 };
    $scope.applicationOptions.whichDescribesYourHSEducation = $scope.applicationOptions.whichDescribesYourHSEducation.split(';');

    $scope.helpOpen = false;

    $scope.allowedStates = {
        'form.basicInformation': true,
    };

    if ($state.current.name !== 'landing' && $state.current.name !== 'form.basicInformation') {
        // The user isn't starting from the beginning, so reroute them
        $state.go('landing');
        return false;
    }

    $rootScope.$on('$stateChangeStart', (event, toState) => {
        if (!$scope.allowedStates[toState.name]) {
            event.preventDefault();
        }
    });

    $scope.$on('allowState', (event, stateToAllow) => {
        $scope.allowedStates[`form.${stateToAllow}`] = true;
    });

    $scope.isAllowedState = function isAllowedState(state) {
        if ($scope.allowedStates[state]) {
            return true;
        }
        return false;
    };

    $scope.toggleSidenav = function toggleSidenav() {
        $mdSidenav('left').toggle();
    };

    $scope.toggleHelpMenu = function toggleHelpMenu() {
        $scope.helpOpen = !$scope.helpOpen;
    };

    $scope.sideNavButtonClicked = function sideNavButtonClicked() {
        if ($mdMedia('xs') || $mdMedia('sm')) {
            $mdSidenav('left').close();
        }
    };

    $scope.showMainContent = function showMainContent() {
        if ($mdMedia('xs') || $mdMedia('sm')) {
            return !$scope.helpOpen;
        }
        return true;
    };

    $scope.showHelpMenu = function showHelpMenu() {
        if ($mdMedia('xs') || $mdMedia('sm')) {
            return $scope.helpOpen;
        }
        return true;
    };
}

FormCtrl.$inject =  ['$scope', '$rootScope', '$state', '$mdSidenav', '$mdMedia', 'CONFIG'];
export default FormCtrl;
