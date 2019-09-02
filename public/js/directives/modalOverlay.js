(function () {
    'use strict';

    angular
        .module('app')
        .directive('modalOverlay', Directive);

    function Directive() {
        return {
            restrict: 'E',
            templateUrl: 'html/directives/modalOverlay.html'
        }
    }

})();