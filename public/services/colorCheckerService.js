(function () {
    'use strict';

    angular
        .module('app')
        .service('colorCheckerService', Service);

    //$inject for minify issue
    Service.$inject = [];

    function Service() {
        this.colorCheck = function() {
            console.log('im working colorCheck function in service');
        }
    }
})();
