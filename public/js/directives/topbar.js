(function () {
    'use strict';

    angular
        .module('app')
        .directive('topbar', Directive);

    Directive.$inject = ['stateService', 'authService'];

    function Directive(stateService, authService) {
        return {
            restrict: 'E',
            templateUrl: 'html/directives/topbar.html',
            link: function ($scope) {
                $scope.logout = () => { authService.logout() };
                $scope.openModal = (which) => {
                    if(which === 'login') stateService.set('modalLogin', true);
                    if(which === 'register') stateService.set('modalRegister', true);
                }
            }
        }
    }

})();