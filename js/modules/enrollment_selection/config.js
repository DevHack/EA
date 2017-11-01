
function Config($stateProvider, $urlRouterProvider) {
    const templateBasePath = './js/modules/enrollment_selection';

    $stateProvider.state('form', {
        url: '/form',
        templateUrl: `${templateBasePath}/templates/form.html`,
        controller: 'FormCtrl',
        abstract: true,
    });

    $stateProvider.state('form.basicInformation', {
        url: '/basic-information',
        templateUrl: `${templateBasePath}/templates/formSteps/basicInformation.html`,
        controller: 'FormBasicInformationCtrl',
    });

    $stateProvider.state('form.degreeSelection', {
        url: '/degree-selection',
        templateUrl: `${templateBasePath}/templates/formSteps/degreeSelection.html`,
        controller: 'FormDegreeSelectionCtrl',
    });

    $stateProvider.state('form.courseList', {
        url: '/course-list',
        templateUrl: `${templateBasePath}/templates/formSteps/courseList.html`,
        controller: 'FormCourseListCtrl',
    });

    $stateProvider.state('form.completeApplication', {
        url: '/complete-application',
        templateUrl: `${templateBasePath}/templates/formSteps/completeApplication.html`,
        controller: 'FormCompleteApplicationCtrl',
    });

    $stateProvider.state('form.confirmation', {
        url: '/confirmation',
        templateUrl: `${templateBasePath}/templates/formSteps/confirmation.html`,
        controller: 'FormConfirmationCtrl',
    });

    $stateProvider.state('form.completed', {
        url: '/completed',
        templateUrl: `${templateBasePath}/templates/formSteps/completed.html`,
        controller: 'FormCompletedCtrl',
    });

    $urlRouterProvider.otherwise('/basic-information');
}

Config.$inject = ['$stateProvider', '$urlRouterProvider'];
export default Config;