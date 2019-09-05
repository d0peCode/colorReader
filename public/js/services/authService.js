(function () {
    'use strict';

    angular
        .module('app')
        .service('authService', Service);

    Service.$inject = ['$http', '$localForage', '$rootScope', 'httpConfig'];

    function Service($http, $localForage, $rootScope, httpConfig) {
        this.login = (params) => {
            return $http({
                url: httpConfig.baseUrl + '/user/login',
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
                data: params
            })
            .then(response => {
                if(response && response.status === 200 && response.data.token) {
                    return $localForage.setItem('authorization', { logged: true, token: response.data.token })
                    .then(() => {
                        $rootScope.$emit('user::auth');
                        return response;
                    })
                    .catch(err => { return err });
                }
            })
            .catch(err => { return err });
        };

        this.logout = () => {
                $localForage.clear()
                    .then(() => { $rootScope.$emit('user::auth') });
        };

        this.remind = (params) => {
            return $http({
                url: httpConfig.baseUrl + '/user/resetStart',
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
                data: params
            })
                .then(response => { return response })
                .catch(err => { return err });
        }
    }
})();