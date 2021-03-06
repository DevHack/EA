import 'angular-material';

function Config($urlRouterProvider, $mdThemingProvider) {

    $urlRouterProvider.otherwise('/landing');

    $mdThemingProvider.definePalette('gfa', {
        50: 'ffebee',
        100: 'ffcdd2',
        200: 'ef9a9a',
        300: 'e57373',
        400: 'ef5350',
        500: '45A1DA',
        600: '439cd3',
        700: 'd32f2f',
        800: 'c62828',
        900: 'b71c1c',
        A100: 'ff8a80',
        A200: 'ff5252',
        A400: 'ff1744',
        A700: 'd50000',
        contrastDefaultColor: 'light',    // whether, by default, text (contrast) on this palette should be dark or light
        contrastDarkColors: ['50', '100', '200', '300', '400', 'A100'], // hues which contrast should be 'dark' by default
        contrastLightColors: undefined,    // could also specify this if default was 'dark'
    });

    $mdThemingProvider.theme('default')
        .primaryPalette('gfa');
}

Config.$inject = ['$urlRouterProvider', '$mdThemingProvider'];
export default Config;