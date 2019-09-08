(function () {
    'use strict';

    angular
        .module('app')
        .controller('mainCtrl', Controller);

    //$inject for minify issue
    Controller.$inject = ['$scope', '$rootScope', '$localForage', 'stateService'];

    function Controller($scope, $rootScope, $localForage, stateService) {
        const vm = $scope;

        vm.convertTo = 'RGB';
        vm.selectedColor = '4F44A0';
        vm.palette = [];
        vm.api = {};
        vm.options = {
            preserveInputFormat: true,
            format: 'hex',
            id: 'colorPicker',
            hide: {
                blur: false,
                escape: false,
                click: false
            }
        };

        window.onload = () => { if(vm.api.open) vm.api.open() };
        setTimeout(() => { if(vm.api.open) vm.api.open(); }, 1000);

        vm.openLogin = () => stateService.set('modalLogin', true);

        vm.saveToPalette = color => {
            console.log(vm.palette, color);

            if(vm.palette.includes(color)) {
                alert('this color is already within your palette');
            } else {
                vm.palette.push(color);
                $localForage.setItem('palette', vm.palette);
            }
        };

        vm.removeOneFromPalette = color => {
            for(let i = 0; i < vm.palette.length; i++) {
                if(vm.palette[i] === color) {
                    vm.palette.splice(i, 1);
                    $localForage.setItem('palette', vm.palette);
                    //$scope.$apply();
                }
            }
        };
        vm.clearEntirePalette = () => {
            $localForage.clear()
                .then(() => { vm.colorsFromCache = []; });
        };

        $localForage.getItem('palette')
            .then(colors => {
                if(colors) vm.palette = colors;
            });

        $rootScope.$on('colorChanged', (e, data) => {

        });
    }
})();
