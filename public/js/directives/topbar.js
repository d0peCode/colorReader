(function () {
    'use strict';

    angular
        .module('app')
        .directive('topbar', Directive);

    Directive.$inject = ['stateService'];

    function Directive(stateService) {
        return {
            restrict: 'E',
            templateUrl: 'html/directives/topbar.html',
            link: function ($scope) {
                $scope.openModal = function (which) {
                    if(which === 'login') stateService.set('modalLogin', true);
                    if(which === 'register') stateService.set('modalRegister', true);
                }
            }
        }
    }

})();