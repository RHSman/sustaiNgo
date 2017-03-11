angular.module('QCController', [])
// inject the server_operations service factory into our controller
.controller('mainController', ['$scope','$http','server_operations', '$log', '$window', '$rootScope',  '$filter', function($scope, $http, server_operations, $log, $window, $rootScope, $filter) {
    $rootScope.showAll=false;
    $rootScope.showAddOp=false;

    $scope.search = function(){
        server_operations.search_brand($rootScope.brandName)
        .success(function(data) {
            $rootScope.showAll=true
            $rootScope.showAddOp=false;
        })
        .error(function(data) {
    		$rootScope.showAll=false;
            $rootScope.showAddOp=false;
			//show error message
        });
    };
    $scope.open_add_op = function(){
        $rootScope.showAddOp=true;
    };
}]);
