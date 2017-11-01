import angular from 'angular';
import ConnectorService from "./services/connector.service";

export default angular.module("apiConnectorModule",[])
    .service("ConnectorService", ConnectorService);