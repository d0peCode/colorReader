(function () {
    'use strict';

    angular
        .module('app')
        .controller('mainCtrl', Controller);

    //$inject for minify issue
    Controller.$inject = ['$scope', 'colorCheckerService'];

    function Controller($scope, colorCheckerService) {
        var vm = $scope;
        vm.fireColorReader = function() {
            console.log('im in controller fireColorReader function working');
            colorCheckerService.colorCheck();
        }
    }
})();
