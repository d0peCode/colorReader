(function () {
    'use strict';

    angular
        .module('traderSpy')
        .factory('authInterceptorService', Factory);

    Factory.$inject = ['$q', '$injector', '$localForage'];

    function Factory ($q, $injector, $localForage) {
        return {
            request: function(config) {

                config.headers = config.headers || {};
                let deferred = $q.defer();

                if(config.url === 'https://api.cloudinary.com/v1_1/ingametrade/upload') {
                    deferred.resolve(config);
                }

                if(config.url.indexOf('api') !== -1) {
                    $localForage.getItem('authorization')
                        .then(function (authData) {
                            if (authData) {
                                config.headers.Authorization = authData.token;
                                deferred.resolve(config);
                            } else {
                                console.log('there is no token yet');
                                deferred.resolve(config);
                            }
                            }, function () {
                                console.log("error with getting authorization localForage in interceptor");
                                deferred.resolve(config);
                            }
                        );
                } else {
                    deferred.resolve(config);
                }
                return deferred.promise;
            }
        };
    }
})();