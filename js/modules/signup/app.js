import angular from 'angular';
import Config from './config';
import LandingCtrl from './controllers/landing.controller';
export default angular.module("signUpModule", [])
    .config(Config)
    .controller("LandingCtrl", LandingCtrl);