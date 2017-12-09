/**
 * Created by andrew on 09.12.17.
 */

angular.module('documents', ['ngResource', 'ngRoute'])

    .factory('documentsResource', ['$resource', function ($resource) {
        var endpoint = '/documents';
        return $resource(endpoint, {id: '@id'}, {});
    }])

    .factory('versionsResource', ['$resource', function ($resource) {
        var endpoint = '/versions';
        return $resource(endpoint, {id: '@id'}, {
            'getByDocument': {
                method: 'GET',
                url: endpoint + '/:id/by-document',
                isArray: true
            }
        });
    }])

    .controller('documentsController', ['$scope', 'documentsResource', 'versionsResource',
        function ($scope, documentsResource, versionsResource) {

        // INITIALIZATION
        $scope.init = function () {
            $scope.getDocuments();
            $scope.selectedDocument = undefined;
            $scope.versions = [];
            $scope.compareList = [];
            $scope.tab = 'DOCUMENTS';
        };

        $scope.getDocuments = function () {
            documentsResource.query(function (documents) {
                $scope.documents = documents;
            });
        };

        $scope.getClass = function(tabName) {
            return $scope.tab == tabName ? 'active' : '';
        };

        $scope.selectTab = function (tabName) {
            $scope.tab = tabName;  
        };
        
        $scope.getVersions = function (doc) {
            $scope.selectedDocument = doc;
            versionsResource.getByDocument({id: doc.id}, function (versions) {
                $scope.versions = versions;
            });
        };
        
        $scope.isActive = function (tabName) {
            switch(tabName) {
                case 'DOCUMENTS': {
                    return $scope.selectedDocument == undefined;
                }
                case 'VERSIONS': {
                    return $scope.versions.length > 0;
                }
                case 'COMPARATOR': {
                    return $scope.compareList.length > 0;
                }
            }  
        };
        
        $scope.init();

    }]);