(function () {
    'use strict';

    angular
        .module('app')
        .directive('modalLogin', Directive);

    Directive.$inject = ['stateService', 'authService'];

    function Directive(stateService, authService) {
        return {
            restrict: 'E',
            templateUrl: 'html/directives/modalLogin.html',
            link: function ($scope) {
                $scope.hideModal = () => stateService.set('modalLogin', false);
                $scope.login = async () => {
                    const response = await authService.login();
                    console.log(response);
                }
            }
        }
    }

})();