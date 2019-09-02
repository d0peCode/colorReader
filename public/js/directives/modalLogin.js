(function () {
    'use strict';

    angular
        .module('app')
        .directive('modalLogin', Directive);

    function Directive() {
        return {
            restrict: 'E',
            templateUrl: 'html/directives/modalLogin.html',
            link: function ($scope, $rootScope) {
                $scope.showLangDropdown = function () {
                    console.log('show lang dropdown')
                }
            }
        }
    }

})();