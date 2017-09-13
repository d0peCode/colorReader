(function () {
    'use strict';

    angular
        .module('app')
        .controller('mainCtrl', Controller);

    //$inject for minify issue
    Controller.$inject = ['$scope'];

    function Controller($scope) {
        var vm = $scope;
        vm.fireColorReader = function() {
            console.log('im in controller fireColorReader function working');
        }
    }
})();
