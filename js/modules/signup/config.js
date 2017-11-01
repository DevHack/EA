
function Config($stateProvider, $urlRouterProvider) {
    const templateBasePath = './js/modules/signup';

    $stateProvider.state('landing', {
        url: '/landing',
        templateUrl: `${templateBasePath}/templates/landing.html`,
        controller: 'LandingCtrl',
    });

    $urlRouterProvider.otherwise('/landing');
}

Config.$inject = ['$stateProvider', '$urlRouterProvider'];
export default Config;