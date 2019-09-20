(function () {
    'use strict';

    angular
        .module('app')
        .controller('mainCtrl', Controller);

    Controller.$inject = ['$scope', '$rootScope', '$localForage', 'stateService'];

    function Controller($scope, $rootScope, $localForage, stateService) {
        const vm = $scope;

        vm.convertTo = 'rgb';
        vm.selectedColor = '4F44A0';
        vm.selectedColorDarken1 = '';
        vm.selectedColorDarken2 = '';
        vm.selectedColorDarken3 = '';
        vm.selectedColorLighten1 = '';
        vm.selectedColorLighten2 = '';
        vm.selectedColorLighten3 = '';
        vm.palette = ['', '', '', '', '', '', '', ''];
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

        vm.$watch('selectedColor', newVal => {
            if(newVal.includes('#')) $scope.selectedColor = newVal.replace('#', '');
            vm.selectedColorDarken1 = tinycolor(`#${$scope.selectedColor}`).darken(15).toString();
            vm.selectedColorDarken2 = tinycolor(`#${$scope.selectedColor}`).darken(30).toString();
            vm.selectedColorDarken3 = tinycolor(`#${$scope.selectedColor}`).darken(40).toString();
            vm.selectedColorLighten1 = tinycolor(`#${$scope.selectedColor}`).lighten(15).toString();
            vm.selectedColorLighten2 = tinycolor(`#${$scope.selectedColor}`).lighten(30).toString();
            vm.selectedColorLighten3 = tinycolor(`#${$scope.selectedColor}`).lighten(40).toString();
        });

        vm.changeSelected = newColor => { vm.selectedColor = newColor };
        vm.changeFormat = newFormat => {
            const color = tinycolor(vm.selectedColor);
            if(newFormat === 'rgb') vm.selectedColor = color.toRgbString();
            if(newFormat === 'hsl') vm.selectedColor = color.toHslString();
            if(newFormat === 'hsv') vm.selectedColor = color.toHsvString();
        };

        window.onload = () => { if(vm.api.open) vm.api.open() };
        setTimeout(() => { if(vm.api.open) vm.api.open(); }, 1000);

        vm.openLogin = () => stateService.set('modalLogin', true);

        vm.saveToPalette = color => {
            const colorObj = tinycolor(color);
            color = colorObj.toHex().toLowerCase();

            if(vm.palette.includes(color)) {
                alert('this color is already within your palette');
            } else {
                vm.palette.push(color);
                $localForage.setItem('palette', vm.palette);
                controlPaletteLength();
            }
        };

        vm.removeOneFromPalette = color => {
            for(let i = 0; i < vm.palette.length; i++) {
                if(vm.palette[i] === color) {
                    vm.palette.splice(i, 1);
                    $localForage.setItem('palette', vm.palette);
                }
            }
        };

        vm.setBackground = pos => {
            if(pos === 'clear') {
                stateService.set('bgEntire', 'edf2f0');
                stateService.set('bgTop', 'edf2f0');
                stateService.set('bgBottom', 'edf2f0');
            } else {
                stateService.set(pos, vm.selectedColor);
            }
        };

        function controlPaletteLength() {
            if(vm.palette.length < 8) {
                while (vm.palette.length !== 8) {
                    vm.palette.push('');
                }
            }
            if(vm.palette.length > 8 && vm.palette.includes("")) {
                for(let i = 0; i < vm.palette.length; i++) {
                    if(vm.palette[i] === '') {
                        vm.palette.splice(i, 1);
                        return;
                    }
                }
            }
        }

        function applyArray(container, key) {
            setTimeout(function() {
                var tempArray = container[key];
                container[key] = [];
                $scope.$apply();
                container[key] = tempArray;
                $scope.$apply();
            }, 0);
        }

        vm.clearEntirePalette = async () => {
            vm.palette = ['', '', '', '', '', '', '', ''];
            applyArray(vm, 'palette');
            await $localForage.setItem('palette', vm.palette);
        };

        vm.clearOnePalette = async color => {
            const colorObj = tinycolor(color);
            color = colorObj.toHex().toLowerCase();
            vm.palette = vm.palette.filter(e => e !== color);
            controlPaletteLength();
            applyArray(vm, 'palette');
            await $localForage.setItem('palette', vm.palette);
        };

        $localForage.getItem('palette')
            .then(colors => {
                if(colors) {
                    vm.palette = colors;
                    controlPaletteLength();
                }
            });
    }
})();
