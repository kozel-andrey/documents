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
            },
            'getParagraph': {
                method: 'GET',
                url: endpoint + '/:id/paragraph',
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

            $scope.getClass = function (tabName) {
                return $scope.tab == tabName ? 'active' : '';
            };

            $scope.getVersions = function (doc) {
                $scope.selectedDocument = doc;
                versionsResource.getByDocument({id: doc.id}, function (versions) {
                    $scope.versions = versions;
                    $scope.tab = 'VERSIONS'
                });
            };

            $scope.addToCompare = function (doc) {
                var added = $scope.getAddedDoc(doc);
                if (added) {
                    $scope.compareList.splice($scope.compareList.indexOf(added), 1);
                } else {
                    $scope.initComparator(doc);
                    if ($scope.compareList.length > 1) {
                        $scope.tab = 'COMPARATOR';
                    }
                }

                $scope.initMasterSlaveScroll();
            };

            $scope.initComparator = function (doc) {
                var newDoc = {};
                newDoc.doc = doc;
                newDoc.firstLine = 0;
                newDoc.totalLines = 0;
                newDoc.content = [];
                $scope.compareList.push(newDoc);
                $scope.loadPartForDocument(newDoc, newDoc.firstLine, 10);
            };

            $scope.getAddedDoc = function (doc) {
                var addedDoc = undefined;

                angular.forEach($scope.compareList, function (added) {
                    if (added.doc.id == doc.id) addedDoc = added;
                });

                return addedDoc;
            };

            $scope.loadPartForDocument = function (newDoc, firstLine, linesCount) {
                versionsResource.getParagraph({
                    id: newDoc.doc.id,
                    paragraphNumber: firstLine,
                    linesCount: linesCount
                }, function (lines) {
                    newDoc.content = newDoc.content.concat(lines);
                    newDoc.totalLines += lines.length;
                });
            };

            $scope.initMasterSlaveScroll = function () {
                elements.on('scroll', function(e){
                    if(e.isTrigger){
                        e.target.scrollLeft = scrollLeft;
                    }else {
                        scrollLeft = e.target.scrollLeft;
                        elements.each(function (element) {
                            if( !this.isSameNode(e.target) ){
                                $(this).trigger('scroll');
                            }
                        });
                    }
                });
            };

            $scope.selectTab = function (tabName) {
                $scope.tab = tabName;
            };

            $scope.isActive = function (tabName) {
                switch (tabName) {
                    case 'DOCUMENTS':
                    {
                        return $scope.selectedDocument == undefined;
                    }
                    case 'VERSIONS':
                    {
                        return $scope.versions.length > 0;
                    }
                    case 'COMPARATOR':
                    {
                        return $scope.compareList.length > 0;
                    }
                }
            };

            $scope.init();

        }])

    .directive('handleScroll', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {

                var doc = element[0];
                $(doc).bind("scroll", function () {
                    if (doc.scrollTop + doc.offsetHeight >= doc.scrollHeight) {
                        scope.$apply(attrs.handleScroll);
                    }
                });
            }
        };
    });