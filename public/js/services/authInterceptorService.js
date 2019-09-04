(function () {
    'use strict';

    angular
        .module('app')
        .factory('authInterceptorService', Factory);

    Factory.$inject = ['$q', '$localForage'];

    function Factory ($q, $localForage) {
        return {
            request: config => {

                config.headers = config.headers || {};
                const deferred = $q.defer();

                if(config.url.indexOf('api') !== -1) {
                    $localForage.getItem('authorization')
                        .then(authData => {
                            if(authData) {
                                config.headers.Authorization = authData.token;
                                deferred.resolve(config);
                            } else {
                                console.log('there is no token yet');
                                deferred.resolve(config);
                            }
                        })
                        .catch(() => { deferred.resolve(config) });
                } else {
                    deferred.resolve(config);
                }
                return deferred.promise;
            }
        };
    }
})();