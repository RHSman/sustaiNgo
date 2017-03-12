angular.module('QCController', [])
// inject the server_operations service factory into our controller
.controller('mainController', ['$scope', '$uibModal', '$http','server_operations', '$log', '$window', '$rootScope',  '$filter', function($scope, $uibModal, $http, server_operations, $log, $window, $rootScope, $filter) {
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

    $scope.showDetails = function(event){
            console.log("asdasdasdsadsadasdas")
            event.preventDefault();

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                size: "lg",
            });
    };
    $scope.reload = function (){
        $route.reload();
    };

}])
.controller('ModalInstanceCtrl', [ '$scope', '$rootScope', '$uibModalInstance', function ($scope, $rootScope, $uibModalInstance) {
    $scope.ok = function () {
        $uibModalInstance.close();
    };

}])
.controller("DoughnutCtrl", function ($scope) {
      $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
        $scope.data = [300, 500, 100];
});

