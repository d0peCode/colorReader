(function () {
    'use strict';

    angular
        .module('app')
        .directive('modalRegister', Directive);

    Directive.$inject = ['stateService', 'registerService'];

    function Directive(stateService, registerService) {
        return {
            restrict: 'E',
            templateUrl: 'html/directives/modalRegister.html',
            link: function ($scope) {
                $scope.email = '';
                $scope.password = '';
                $scope.passwordConf = '';
                $scope.hideModal = () => stateService.set('modalRegister', false);
                $scope.register = async () => {
                    if($scope.password !== $scope.passwordConf) {
                        alert('Passwords are not equal!')
                    } else {
                        const params = {
                            email: $scope.email,
                            password: $scope.password
                        };
                        const response = await registerService.register(params);
                        console.log(response);
                    }
                }
            }
        }
    }

})();