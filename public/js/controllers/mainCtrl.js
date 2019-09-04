(function () {
    'use strict';

    angular
        .module('app')
        .controller('mainCtrl', Controller);

    //$inject for minify issue
    Controller.$inject = ['$scope', '$rootScope', '$localForage', 'colorCheckerService'];

    function Controller($scope, $rootScope, $localForage, colorCheckerService) {
        var vm = $scope;

        vm.selectedColor = '1E00FF';
        vm.options = {
            preserveInputFormat: true,
            format: 'hex',
            id: 'colorPicker'
        };
        vm.convertedColors = [ {} ];

        vm.fireColorReader = function() {
            //execute check function which will execute change function and emit event 'colorChanged'
            colorCheckerService.colorCheck(vm.color_field);
        };

        vm.clearCache = function() {
            //clear colors pallete
            $localForage.clear().then(function() {
                vm.colorsFromCache = [];
            });
        };

        $localForage.getItem('colors').then(function(colors) {
            vm.colorsFromCache = colors;
        });

        $rootScope.$on('colorChanged', function(event, data) {
            if(data) {
                console.log(data);
                var lastObj = vm.convertedColors[vm.convertedColors.length - 1];
                if (!lastObj.colorInHSL || !lastObj.colorInHEX || !lastObj.colorInRGB) {
                    vm.convertedColors[vm.convertedColors.length - 1] = Object.assign(lastObj, data);
                    if(vm.convertedColors[vm.convertedColors.length - 1].colorInRGB &&
                       vm.convertedColors[vm.convertedColors.length - 1].colorInHSL &&
                       vm.convertedColors[vm.convertedColors.length - 1].colorInHEX) {
                           $localForage.getItem('colors').then(function(colors) {
                               colors = colors || []; // initialize as empty array
                               console.log(colors);
                               console.log(vm.convertedColors[vm.convertedColors.length - 1].colorInHSL+vm.convertedColors[vm.convertedColors.length - 1].colorInRGB+vm.convertedColors[vm.convertedColors.length - 1].colorInHEX)
                               colors.push({
                                   inHSL: vm.convertedColors[vm.convertedColors.length - 1].colorInHSL,
                                   inHEX: vm.convertedColors[vm.convertedColors.length - 1].colorInHEX,
                                   inRGB: vm.convertedColors[vm.convertedColors.length - 1].colorInRGB
                               });
                               $localForage.setItem('colors', colors).then(function() {
                                   //$rootScope.$emit('localForageUpdated');
                                   vm.colorsFromCache = colors;
                                   console.log(vm.colorsFromCache);
                               });
                            });
                        }
                } else {
                    vm.convertedColors.push(Object.assign({}, data));  // Push a new object
                    console.log('push new obj');
                }
            }
        });
    }
})();
