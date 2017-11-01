import angular from 'angular';
import 'angular-material';
import 'angular-ui-router';
import Config from "./config";
import signUpModule from "../signup/app";
import enrollmentSelectionModule from "../enrollment_selection/app";

export default angular.module('eaRoot',
    [
        'ui.router',
        'ngMaterial',
        'signUpModule',
        'enrollmentSelectionModule'
    ]) // eslint-disable-line
    .config(Config)
    .run(($rootScope, $window, $location) => {
        // Log page views to GTM
        $rootScope.$on('$stateChangeSuccess', () => {
            const path = $location.path();
            const absUrl = $location.absUrl();
            const virtualUrl = absUrl.substring(absUrl.indexOf(path));
            $window.dataLayer.push({ event: 'virtualPageView', virtualUrl });
        });
    })
    .constant('CONFIG', {
        baseUrl: '/',
    });