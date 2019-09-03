(function () {
    'use strict';

    angular
        .module('app')
        .directive('modalRegister', Directive);

    Directive.$inject = ['stateService'];

    function Directive(stateService) {
        return {
            restrict: 'E',
            templateUrl: 'html/directives/modalRegister.html',
            link: function ($scope) {
                $scope.hideModal = () => stateService.set('modalRegister', false);
            }
        }
    }

})();