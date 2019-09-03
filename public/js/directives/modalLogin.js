(function () {
    'use strict';

    angular
        .module('app')
        .directive('modalLogin', Directive);

    Directive.$inject = ['stateService'];

    function Directive(stateService) {
        return {
            restrict: 'E',
            templateUrl: 'html/directives/modalLogin.html',
            link: function ($scope) {
                $scope.hideModal = () => stateService.set('modalLogin', false);
            }
        }
    }

})();