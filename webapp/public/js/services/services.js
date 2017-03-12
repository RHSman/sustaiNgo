angular.module('QCService', [])

.factory('server_operations', ['$http', '$filter' ,function($http, $filter) {
    return {
        search_brand : function (brand_name) {
            return $http.get('http://127.0.0.1:6543/api/brands?name=' + brand_name)
        },
        register_opinion : function (brand_name, formData) {
            console.log(formData)
            return $http.post('/api/register', {'brand': brand_name, 'form_data': formData});

        }



    }

}])
