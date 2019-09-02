(function () {
    'use strict';

    angular
        .module('app')
        .directive('topbar', Directive);

    function Directive() {
        return {
            restrict: 'E',
            templateUrl: 'html/topbarView.html',
            controller: 'topbar',
            link: function ($scope, $rootScope) {
                $scope.showLangDropdown = function () {
                    console.log('show lang dropdown')
                }
            }
        }
    }

})();