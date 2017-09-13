(function () {
    'use strict';

    angular
        .module('app')
        .service('colorChangerService', Service);

    //$inject for minify issue
    Service.$inject = ['colorCheckerService'];

    function Service(colorCheckerService) {
        this.colorChange = function() {
            
        }
    }
})();
