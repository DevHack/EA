import angular from 'angular';
import 'angular-material';
import 'angular-ui-router';
import Config from "./config";
import LandingCtrl from "./controllers/LandingCtrl";
import FormCtrl from "./controllers/FormCtrl";
import FormBasicInformationCtrl from "./controllers/formSteps/FormBasicInformationCtrl";
import FormCompleteApplicationCtrl from "./controllers/formSteps/FormCompleteApplicationCtrl";
import FormCompletedCtrl from "./controllers/formSteps/FormCompletedCtrl";
import FormConfirmationCtrl from "./controllers/formSteps/FormConfirmationCtrl";
import FormCourseListCtrl from "./controllers/formSteps/FormCourseListCtrl";
import FormDegreeSelectionCtrl from "./controllers/formSteps/FormDegreeSelectionCtrl";
import FormApiFactory from "./services/formApiFactory";
import FormDataFactory from "./services/formDataFactory";
import FormHelperFactory from "./services/formHelperFactory";

export default angular.module('gfaForm', ['ui.router', 'ngMaterial']) // eslint-disable-line
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
    })

    .controller("LandingCtrl", LandingCtrl)
    .controller("FormCtrl", FormCtrl)
    .controller("FormBasicInformationCtrl", FormBasicInformationCtrl)
    .controller("FormCompleteApplicationCtrl", FormCompleteApplicationCtrl)
    .controller("FormCompletedCtrl", FormCompletedCtrl)
    .controller("FormConfirmationCtrl", FormConfirmationCtrl)
    .controller("FormCourseListCtrl", FormCourseListCtrl)
    .controller("FormDegreeSelectionCtrl", FormDegreeSelectionCtrl)
    .factory("FormApiFactory",FormApiFactory)
    .factory("FormDataFactory",FormDataFactory)
    .factory("FormHelperFactory",FormHelperFactory)
