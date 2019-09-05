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
                $scope.email = '';
                $scope.password = '';
                $scope.success = false;
                $scope.errorPass = false;
                $scope.errorActive = false;
                $scope.errorRemind = false;
                $scope.currentTab = 'login';

                $scope.hideModal = () => stateService.set('modalLogin', false);
                $scope.setTab = (tab) => { $scope.currentTab = tab };
                $scope.login = async () => {
                    const params = { email: $scope.email, password: $scope.password };
                    const response = await authService.login(params);
                    if(response.status === 403) $scope.errorActive = true;
                    if(response.status === 401) $scope.errorPass = true;
                    if(response.status === 200) stateService.set('modalLogin', false);
                    $scope.$apply();
                };
                $scope.remind = async () => {
                    const params = { email: $scope.email };
                    const response = await authService.remind(params);
                    console.log(response.status);
                    if(response.status === 200) {
                        $scope.success = true
                    } else {
                        $scope.errorRemind = true;
                    }
                    $scope.$apply();
                }
            }
        }
    }

})();