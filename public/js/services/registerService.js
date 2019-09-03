(function () {
    'use strict';

    angular
        .module('app')
        .service('registerService', Service);

    Service.$inject = ['$http', 'httpConfig'];

    function Service($http, httpConfig) {
        this.register = function (params) {
            return $http({
                url: httpConfig.baseUrl + '/user/register',
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
                data: params
            })
            .then(response => { return response })
            .catch(err => { return err })
        };
    }
})();
