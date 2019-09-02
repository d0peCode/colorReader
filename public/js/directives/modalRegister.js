(function () {
    'use strict';

    angular
        .module('app')
        .directive('modalRegister', Directive);

    function Directive() {
        return {
            restrict: 'E',
            templateUrl: 'html/directives/modalRegister.html',
            link: function ($scope, $rootScope) {
                $scope.showLangDropdown = function () {
                    console.log('show lang dropdown')
                }
            }
        }
    }

})();