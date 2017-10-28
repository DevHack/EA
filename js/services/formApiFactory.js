/* global app, angular */
app.factory('FormApiFactory', ['$http', '$q', 'FormDataFactory', function FormApiFactory($http, $q, FormDataFactory) {
  const baseUrl = 'https://tlbzufb3z4.execute-api.us-east-1.amazonaws.com/PROD/gfa/';

  // This functions argument is expected to be passed by reference
  // Expects array of objects
  const transformBooleans = function transformBooleans(passedDataArray) {
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
  };

  return {
    createLearnerApplication() {
      const defer = $q.defer();
      const data = FormDataFactory.getData();
      $http.post(`${baseUrl}ea-learner-applications`, data).then((response) => {
        defer.resolve(response.data);
      }, (response) => {
        defer.reject(response);
      });
      return defer.promise;
    },
    updateLearnerApplication() {
      const defer = $q.defer();
      const data = FormDataFactory.getData();
      $http.patch(`${baseUrl}ea-learner-applications`, data).then((response) => {
        defer.resolve(response.data);
      }, (response) => {
        defer.reject(response);
      });
      return defer.promise;
    },
    getDegrees() {
      const defer = $q.defer();
      $http.get(`${baseUrl}ea-applications-and-degrees?applicationId=a0b41000006zh6e`).then((response) => {
        defer.resolve(response.data);
      }, (response) => {
        defer.reject(response);
      });
      return defer.promise;
    },
    getCoursesByApplicationDegreeId(applicationDegreeId) {
      const defer = $q.defer();
      $http.get(`${baseUrl}ea-degrees-and-courses?applicationDegreeId=${applicationDegreeId}`).then((response) => {
        transformBooleans(response.data);
        defer.resolve(response.data);
      }, (response) => {
        defer.reject(response);
      });
      return defer.promise;
    },
    transformBooleans(data) {
      transformBooleans(data);
    },
  };
}]);
