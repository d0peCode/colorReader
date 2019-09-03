(function () {
    'use strict';

    const Constant = {
        baseUrl: 'http://localhost:3000/api'
    };

    angular
        .module('app')
        .constant('httpConfig', Constant);
})();
