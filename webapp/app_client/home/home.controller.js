(function() {
  
    angular
        .module('meanApp')
        .controller('homeCtrl', homeCtrl);

    function homeCtrl($scope, $rootScope, server_operations, $uibModal) {
        $scope.inputTextStyle="form-control text-center input-sm";

        $rootScope.showAll=false;
        $rootScope.showAddOp=false;
        $rootScope.notFound=false;

        $rootScope.EnvScore=0;
        $rootScope.WorkScore=0;
        $rootScope.IsOrgCott=false;
        $rootScope.IsRecy=false;
        $rootScope.IsUk=false;


        getRandomInt = function(){
            min=0;
            max=8;
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };



        $scope.search = function (){
            server_operations.search_brand( $rootScope.brandName )
                .success(function(data) {
                    if (data){ 
                        console.log(data);
                        $rootScope.notFound=false;
                        var items= data.data[0].category.split(",");
                        for (item in items) {
                            if (items[item].indexOf("recycled")>-1) {
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
                    }
                    $rootScope.showAll=true;
                    $rootScope.showAddOp=false;
                    $rootScope.EnvString="width: " + 100*$rootScope.EnvScore/8  + "%;";
                    $rootScope.WorkString="width: " + 100*$rootScope.WorkScore/8  + "%;";

                    $rootScope.UserScore=getRandomInt();
                    $rootScope.UserString="width: " + 100*$rootScope.UserScore/8  + "%;";
                })
				.error(function(data) {
                    //$scope.inputTextStyle="glyphicon glyphicon-warning-sign form-control-feedback";
                    $rootScope.notFound=true;
      	      		$rootScope.showAll=false;
      	      		$rootScope.showAddOp=false;
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

    } //here ends the homeCtrl function

})();
