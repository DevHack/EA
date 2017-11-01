import angular from 'angular';
import apiConnectorModule from '../api_connector/app';

import Config from "./config";
import FormCtrl from "./controllers/form.controller";
import FormBasicInformationCtrl from "./controllers/form_steps/form_basic_information.controller";
import FormCompleteApplicationCtrl from "./controllers/form_steps/form_complete_application.controller";
import FormCompletedCtrl from "./controllers/form_steps/form_completed.controller";
import FormConfirmationCtrl from "./controllers/form_steps/form_confirmation.controller";
import FormCourseListCtrl from "./controllers/form_steps/form_course_list.controller";
import FormDegreeSelectionCtrl from "./controllers/form_steps/form_degree_selection.controller";
import FormService from "./services/form.service";
import UtilService from "./services/util.service";

export default angular.module("enrollmentSelectionModule", ["apiConnectorModule"])
    .config(Config)
    .controller("FormCtrl", FormCtrl)
    .controller("FormBasicInformationCtrl", FormBasicInformationCtrl)
    .controller("FormCompleteApplicationCtrl", FormCompleteApplicationCtrl)
    .controller("FormCompletedCtrl", FormCompletedCtrl)
    .controller("FormConfirmationCtrl", FormConfirmationCtrl)
    .controller("FormCourseListCtrl", FormCourseListCtrl)
    .controller("FormDegreeSelectionCtrl", FormDegreeSelectionCtrl)
    .service("FormService", FormService)
    .service("UtilService", UtilService)
    .constant('CONFIG', {
        baseUrl: '/',
    })