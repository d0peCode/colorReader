(function () {
    'use strict';

    angular
        .module('app', [
            'ngRoute',
            'LocalForageModule'
        ])
        .config(config);

    //$inject for minify issue
    config.$inject = ['$routeProvider'];

    function config ($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'mainCtrl',
                templateUrl: 'html/views/main.html',
                controllerAs: 'vm'
            })
            .otherwise('/');
    };

})();
