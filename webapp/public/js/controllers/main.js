angular.module('QCController', [])
// inject the server_operations service factory into our controller
.controller('mainController', ['$scope', '$uibModal', '$http','server_operations', '$log', '$window', '$rootScope',  '$filter', function($scope, $uibModal, $http, server_operations, $log, $window, $rootScope, $filter) {
    $rootScope.showAll=false;
    $rootScope.showAddOp=false;
                    $rootScope.EnvScore=0;
                    $rootScope.WorkScore=0;
                    $rootScope.IsOrgCott=false;
                    $rootScope.IsRecy=false;
                    $rootScope.IsUk=false;

    getRandomInt = function(){
        min=0
        max=8
        console.log(Math.floor(Math.random() * (max - min + 1)) + min)
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    $scope.search = function(){
        server_operations.search_brand('\"' + $rootScope.brandName + '\"')
        .success(function(data) {
            if (data){
            var items= data.data[0].category.split(",")
            for (item in items) {
                if (items[item].indexOf("recycled")>-1) {
                    console.log("is recycled")
                    $rootScope.IsRecy=true;
                    $rootScope.EnvScore+=4;

                }
                if (items[item].indexOf("made in the")>-1) {
                    $rootScope.IsUk=true;
                    $rootScope.EnvScore+=1;
                }
                if (items[item].indexOf("organic cott")>-1) {
                    $rootScope.IsOrgCott=true;
                    $rootScope.EnvScore+=3;
                }
                if (items[item].indexOf("air trade")>-1) {
                    $rootScope.WorkScore+=4;
                }
                if (items[item].indexOf("sustainable fabr")>-1) {
                    $rootScope.EnvScore+=2;
                }
            }
            $rootScope.showAll=true
            $rootScope.showAddOp=false;
            $rootScope.EnvString="width: " + 100*$rootScope.EnvScore/8  + "%;"
            $rootScope.WorkString="width: " + 100*$rootScope.WorkScore/8  + "%;"

            $rootScope.UserScore=getRandomInt()
            $rootScope.UserString="width: " + 100*$rootScope.UserScore/8  + "%;"
            console.log($rootScope.UserString)
            }

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
            event.preventDefault();

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                size: "lg",
            });
    };
    $scope.reload = function (){
            $window.location.reload();
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

