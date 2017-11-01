/* global app, angular */
import FormDataModel from "./../data_models/form_data.model";

export default class FormService {
    static get $inject() {
        return ["$q", "ConnectorService"];
    }

    constructor($q, ConnectorService) {
        this._$q = $q;
        this._connectorService = ConnectorService;
        this._formData = new FormDataModel();
    }

    createLearnerApplication() {
        const defer = this._$q.defer();
        const formData = this._formData.getData();
        this._connectorService.createLearnerApplication(formData)
            .then((response) => {
                defer.resolve(response.data);
            }, (response) => {
                defer.reject(response);
            });
        return defer.promise;
    }

    updateLearnerApplication() {
        const defer = this._$q.defer();
        const formData = this._formData.getData();
        this._connectorService.updateLearnerApplication(formData)
            .then((response) => {
                defer.resolve(response.data);
            }, (response) => {
                defer.reject(response);
            });
        return defer.promise;
    }

    getDegrees() {
        const defer = this._$q.defer();
        let applicationId = 'a0b41000006zh6e';
        this._connectorService.getAllDegrees(applicationId)
            .then((response) => {
                defer.resolve(response.data);
            }, (response) => {
                defer.reject(response);
            });
        return defer.promise;
    }

    getCoursesByApplicationDegreeId(applicationDegreeId) {
        const defer = this._$q.defer();
        this._connectorService.getAllCoursesByDegree(applicationDegreeId)
            .then((response) => {
                this._transformBooleans(response.data);
                defer.resolve(response.data);
            }, (response) => {
                defer.reject(response);
            });
        return defer.promise;
    }

    // This functions argument is expected to be passed by reference
    // Expects array of objects
    _transformBooleans(passedDataArray) {
        const dataArray = passedDataArray;
        for (let i = 0, length = dataArray.length; i < length; i++) {
            angular.forEach(dataArray[i], (value, key) => {
                if (value === 'true') {
                    dataArray[i][key] = true;
                } else if (value === 'false') {
                    dataArray[i][key] = false;
                }
            });
        }
    }
}