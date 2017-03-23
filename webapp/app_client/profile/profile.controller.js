(function() {
  
  angular
    .module('meanApp')
    .controller('profileCtrl', profileCtrl);

  profileCtrl.$inject = ['$scope', '$rootScope', '$location', 'meanData'];
  function profileCtrl($scope, $rootScope, $location, meanData) {
      $rootScope.UserProfile={};
      $rootScope.UserProfile.laborScore=50;
      $rootScope.UserProfile.laborString="width: " + $rootScope.UserProfile.laborScore  + "%;";
      $rootScope.UserProfile.localScore=50;
      $rootScope.UserProfile.localString="width: " + $rootScope.UserProfile.localScore  + "%;";
      $rootScope.UserProfile.organicScore=50;
      $rootScope.UserProfile.organicString="width: " + $rootScope.UserProfile.organicScore  + "%;";



      var vm = this;

      vm.user = {};

      meanData.getProfile()
          .success(function(data) {
              vm.user = data;
          })
      .error(function (e) {
          console.log(e);
      });

      $scope.more_labor= function(){
        $rootScope.UserProfile.laborScore+=10;
        $rootScope.UserProfile.localScore-=5;
        $rootScope.UserProfile.organicScore-=5;
        $rootScope.UserProfile.laborString="width: " + $rootScope.UserProfile.laborScore  + "%;";
        $rootScope.UserProfile.localString="width: " + $rootScope.UserProfile.localScore  + "%;";
        $rootScope.UserProfile.organicString="width: " + $rootScope.UserProfile.organicScore  + "%;";
      };
      $scope.less_labor= function(){
        $rootScope.UserProfile.laborScore-=10;
        $rootScope.UserProfile.localScore+=5;
        $rootScope.UserProfile.organicScore+=5;
        $rootScope.UserProfile.laborString="width: " + $rootScope.UserProfile.laborScore  + "%;";
        $rootScope.UserProfile.localString="width: " + $rootScope.UserProfile.localScore  + "%;";
        $rootScope.UserProfile.organicString="width: " + $rootScope.UserProfile.organicScore  + "%;";
      };


      $scope.more_local= function(){
        $rootScope.UserProfile.localScore+=10;
        $rootScope.UserProfile.laborScore-=5;
        $rootScope.UserProfile.organicScore-=5;
        $rootScope.UserProfile.localString="width: " + $rootScope.UserProfile.localScore  + "%;";
        $rootScope.UserProfile.laborString="width: " + $rootScope.UserProfile.laborScore  + "%;";
        $rootScope.UserProfile.organicString="width: " + $rootScope.UserProfile.organicScore  + "%;";
      };
      $scope.less_local= function(){
        $rootScope.UserProfile.localScore-=10;
        $rootScope.UserProfile.laborScore+=5;
        $rootScope.UserProfile.organicScore+=5;
        $rootScope.UserProfile.localString="width: " + $rootScope.UserProfile.localScore  + "%;";
        $rootScope.UserProfile.laborString="width: " + $rootScope.UserProfile.laborScore  + "%;";
        $rootScope.UserProfile.organicString="width: " + $rootScope.UserProfile.organicScore  + "%;";
      };

      $scope.more_organic= function(){
        $rootScope.UserProfile.organicScore+=10;
        $rootScope.UserProfile.laborScore-=5;
        $rootScope.UserProfile.localScore-=5;
        $rootScope.UserProfile.organicString="width: " + $rootScope.UserProfile.organicScore  + "%;";
        $rootScope.UserProfile.laborString="width: " + $rootScope.UserProfile.laborScore  + "%;";
        $rootScope.UserProfile.localString="width: " + $rootScope.UserProfile.localScore  + "%;";
      };
      $scope.less_organic= function(){
        $rootScope.UserProfile.organicScore-=10;
        $rootScope.UserProfile.laborScore+=5;
        $rootScope.UserProfile.localScore+=5;
        $rootScope.UserProfile.organicString="width: " + $rootScope.UserProfile.organicScore  + "%;";
        $rootScope.UserProfile.laborString="width: " + $rootScope.UserProfile.laborScore  + "%;";
        $rootScope.UserProfile.localString="width: " + $rootScope.UserProfile.localScore  + "%;";
      };
  }

})();
