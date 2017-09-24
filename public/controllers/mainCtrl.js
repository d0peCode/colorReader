(function () {
    'use strict';

    angular
        .module('app')
        .controller('mainCtrl', Controller);

    //$inject for minify issue
    Controller.$inject = ['$scope', '$rootScope', 'colorCheckerService'];

    function Controller($scope, $rootScope, colorCheckerService) {
        var vm = $scope;
        vm.fireColorReader = function() {
            console.log('im in controller fireColorReader function working');
            colorCheckerService.colorCheck(vm.color_field);
        };
        $rootScope.$on('colorChanged', function(event, data) {
          console.log('colorChanged event emitted');
          console.log('colors in others: (in controller)' + data);
          vm.convertedColors = [vm.color_field]
          vm.convertedColors.push(data);
        });

    }
})();
