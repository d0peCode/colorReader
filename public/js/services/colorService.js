(function () {
    'use strict';

    angular
        .module('app')
        .service('colorService', Service);

    Service.$inject = ['$http', '$localForage', '$rootScope', 'httpConfig'];

    function Service($http, $localForage, $rootScope, httpConfig) {
        this.set = palette => {
            return $http({
                url: httpConfig.baseUrl + '/color/add',
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
                data: palette
            })
            .then(response => {
                return $localForage.setItem('palette', response.data)
                    .then(() => {
                        $rootScope.$emit('update::palette');
                        return response;
                    })
                    .catch(err => { return err });
            })
            .catch(err => { return err });
        };
        this.get = () => {
            return $http({
                url: httpConfig.baseUrl + '/color/get',
                headers: { 'Content-Type': 'application/json' },
                method: 'GET'
            })
            .then(response => {
                return $localForage.setItem('palette', response.data)
                    .then(() => {
                        $rootScope.$emit('update::palette');
                        return response;
                    })
                    .catch(err => { return err });
            })
            .catch(err => { return err });        }
    }
})();