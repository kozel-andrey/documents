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

            //Set active class for selected tab
            $scope.getClass = function (tabName) {
                return $scope.tab == tabName ? 'active' : '';
            };

            //Switch active tab
            $scope.selectTab = function (tabName) {
                $scope.tab = tabName;
            };

            //Get versions for selected document
            $scope.getVersions = function (doc) {
                $scope.selectedDocument = doc;
                versionsResource.getByDocument({id: doc.id}, function (versions) {
                    $scope.versions = versions;
                    $scope.tab = 'VERSIONS'
                });
            };

            //Add or remove document version from compare list
            $scope.toggleVersion = function (doc) {
                var added = $scope.getAddedDoc(doc);
                if (added) {
                    $scope.compareList.splice($scope.compareList.indexOf(added), 1);
                } else {
                    $scope.initComparator(doc);
                    if ($scope.compareList.length > 1) {
                        $scope.tab = 'COMPARATOR';
                    }
                }
            };

            //Init document version comparator and loaded starting content
            $scope.initComparator = function (doc) {
                var newDoc = {};
                newDoc.doc = doc;
                newDoc.firstLine = 0;
                newDoc.totalLines = 0;
                newDoc.content = [];
                $scope.compareList.push(newDoc);
                $scope.loadPartForDocument(newDoc, newDoc.firstLine, 10);
            };

            //Get added to list comparator by document version
            $scope.getAddedDoc = function (doc) {
                var addedDoc = undefined;

                angular.forEach($scope.compareList, function (added) {
                    if (added.doc.id == doc.id) addedDoc = added;
                });

                return addedDoc;
            };

            //Load part of some version of document using selected offset and limit
            $scope.loadPartForDocument = function (newDoc, firstLine, linesCount) {
                if (newDoc.totalLines >= firstLine + linesCount) return;

                versionsResource.getParagraph({
                    id: newDoc.doc.id,
                    paragraphNumber: firstLine,
                    linesCount: linesCount
                }, function (lines) {
                    newDoc.content = newDoc.content.concat(lines);
                    newDoc.totalLines += lines.length;
                });
            };

            //Add master scroll for added comporator
            $scope.initMasterSlaveScroll = function () {
                elements.on('scroll', function (e) {
                    if (e.isTrigger) {
                        e.target.scrollLeft = scrollLeft;
                    } else {
                        scrollLeft = e.target.scrollLeft;
                        elements.each(function (element) {
                            if (!this.isSameNode(e.target)) {
                                $(this).trigger('scroll');
                            }
                        });
                    }
                });
            };

            $scope.init();

        }])

    .directive('handleScroll', function () {
        //Current position
        var scrollTop = 0;

        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                //Panel body of document comparator
                var doc = element[0];

                //Bind scroll event to current element. On scroll select
                // all comparators and scroll them (exclude current window)
                // like a main window
                $(doc).bind("scroll", function (e) {
                    if (e.isTrigger) {
                        e.target.scrollTop = scrollTop;
                    } else {
                        scrollTop = e.target.scrollTop;
                        var elements = angular.element('#comparator_tab_id').find('.master-slave');
                        elements.each(function () {
                            if (!this.isSameNode(e.target)) {
                                $(this).trigger('scroll');
                            }
                        });
                        if (doc.scrollTop + doc.offsetHeight >= doc.scrollHeight) {
                            scope.$apply(attrs.handleScroll);
                        }
                    }
                });
            }
        };
    });