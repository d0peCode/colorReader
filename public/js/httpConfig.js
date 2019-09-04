(function () {
    'use strict';

    const Constant = {
        baseUrl: 'http://localhost:3000/api'
    };

    Configure.$inject = ['$httpProvider'];

    function Configure($httpProvider) {
        $httpProvider.interceptors.push('authInterceptorService');
    }

    angular
        .module('app')
        .constant('httpConfig', Constant)
        .config(Configure);

})();
