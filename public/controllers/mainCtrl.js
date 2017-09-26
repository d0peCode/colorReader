(function () {
    'use strict';

    angular
        .module('app')
        .controller('mainCtrl', Controller);

    //$inject for minify issue
    Controller.$inject = ['$scope', '$rootScope', 'colorCheckerService'];

    function Controller($scope, $rootScope, colorCheckerService) {
        var vm = $scope;
        vm.convertedColors = [ {} ];

        vm.fireColorReader = function() {
            console.log('im in controller fireColorReader function working');
            //vm.convertedColors.push(vm.color_field);
            colorCheckerService.colorCheck(vm.color_field);
        };

        $rootScope.$on('colorChanged', function(event, data) {
            if(data) {
                var lastObj = vm.convertedColors[vm.convertedColors.length - 1];
                if (!lastObj) {
                    vm.convertedColors.push({});
                }
                if (lastObj.firstValue && lastObj.secondValue) {
                    vm.convertedColors.push(Object.assign({}, data));  // Push a new object
                } else {
                    vm.convertedColors[vm.convertedColors.length - 1] = Object.assign(vm.convertedColors[vm.convertedColors.length - 1], data);
                }
            }
        });
        vm.klik = function() {
            console.log('Length: ' + vm.convertedColors.length);
            console.log('Type: ' + typeof vm.convertedColors);
        };
    }
})();
