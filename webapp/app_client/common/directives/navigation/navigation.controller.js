(function () {

  angular
    .module('meanApp')
    .controller('navigationCtrl', navigationCtrl);

  navigationCtrl.$inject = ['$location','authentication', '$rootScope'];
  function navigationCtrl($location, authentication, $rootScope) {
    var vm = this;

    $rootScope.isLoggedIn = authentication.isLoggedIn();

    vm.currentUser = authentication.currentUser();

  }

})();
