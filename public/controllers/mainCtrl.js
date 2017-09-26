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
                console.log(data);
                var lastObj = vm.convertedColors[vm.convertedColors.length - 1];
                if (!lastObj.colorInHSL || !lastObj.colorInHEX || !lastObj.colorInRGB) {
                    vm.convertedColors[vm.convertedColors.length - 1] = Object.assign(lastObj, data);
                    console.log('add');
                } else {
                    vm.convertedColors.push(Object.assign({}, data));  // Push a new object
                    console.log('push new obj');
                }
            }
        });

        vm.klik = function() {
            console.log('obj: ' + vm.convertedColors);
            console.log('Type: ' + typeof vm.convertedColors);
        };
    }
})();
