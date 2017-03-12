angular.module('QCService', [])

.factory('server_operations', ['$http', '$filter' ,function($http, $filter) {
    return {
        search_brand : function (brand_name) {
            //return $http.post('/api/search', {'brand': brand_name});
            return $http.get('http://localhost:9200/sustaingo/Brand/_search?from=0&size=20')
        },
        register_opinion : function (brand_name, formData) {
            console.log(formData)
            return $http.post('/api/register', {'brand': brand_name, 'form_data': formData});

        }



    }

}])
