(function () {
    'use strict';

    angular
        .module('app')
        .directive('modalOverlay', Directive);

    function Directive() {
        return {
            restrict: 'E',
            template: '<div class="modal__overlay"></div>'
        }
    }

})();