(function() {

  angular
    .module('meanApp')
    .service('server_operations', server_operations);

  server_operations.$inject = ['$http', 'authentication'];
  function server_operations ($http, authentication) {
      return {
        search_brand : function (brand_name) {
            //console.log('/api//brands?name=\'' + brand_name +'\'');
            return $http.post('/api/search',{"brand_name": '/api//brands?name=\"' + brand_name +'\"'});
        },
        register_opinion : function (brand_name, formData) {
            console.log(formData)
            return $http.post('/api/register', {'brand': brand_name, 'form_data': formData});

        }
      };

  }

})();
