export default class ConnectorService{
    static get $inject(){
        return ['$http'];
    }
    constructor($http){
        this._baseUrl = 'https://tlbzufb3z4.execute-api.us-east-1.amazonaws.com/PROD/gfa';
        this._$http =$http;
    }

    _doConnect(apiPath, method, data){
        return this._$http({
            url : this._baseUrl + apiPath,
            method : method,
            data : data
        });
    }

    createLearnerApplication(formData){
        let apiPath = "/ea-learner-applications",
            method = "POST";
        return this._doConnect(apiPath,method,formData);
    }

    updateLearnerApplication(formData){
        let apiPath = "/ea-learner-applications",
            method = "PATCH";
        return this._doConnect(apiPath,method,formData);
    }
    getAllDegrees(applicationId){
        let apiPath = `/ea-applications-and-degrees?applicationId=${applicationId}`,
            method = "GET";
        return this._doConnect(apiPath,method);
    }
    getAllCoursesByDegree(applicationDegreeId){
        let apiPath = `/ea-degrees-and-courses?applicationDegreeId=${applicationDegreeId}`,
            method = "GET";
        return this._doConnect(apiPath,method);
    }
}

