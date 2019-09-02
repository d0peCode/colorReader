(function () {
    'use strict';

    angular
        .module('app')
        .directive('topbar', Directive);

    function Directive() {
        return {
            restrict: 'E',
            templateUrl: 'html/directives/topbar.html',
            link: function ($scope) {
                $scope.openModal = function (which) {
                    if(which === 'login') {
                        $scope.$parent.modalLogin = true;
                    }
                    if(which === 'register') {
                        $scope.$parent.modalRegister = true;
                    }
                }
            }
        }
    }

})();