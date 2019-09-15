(function () {
    'use strict';

    angular
        .module('app')
        .controller('mainCtrl', Controller);

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

        vm.$watch('palette', newVal => {
            console.log('caught change');

            if(newVal.length < 8) {
                const fillArr =  new Array(8 - newVal.length);
                fillArr.fill('');
                vm.palette = vm.palette.concat(fillArr);
                console.log(vm.palette);
            }
            if(newVal.length > 8 && newVal.includes("")) {
                console.log('more than 8 and contain empty string');
                for(let i = 0; i < newVal.length; i++) {
                    if(newVal[i] === '') {
                        vm.palette.splice(i, 1);
                        return;
                    }
                }
            }
        });

        vm.$watch('selectedColor', newVal => {
            if(newVal.includes('#')) {
                $scope.selectedColor = newVal.replace('#', '');
            }
        });

        window.onload = () => { if(vm.api.open) vm.api.open() };
        setTimeout(() => { if(vm.api.open) vm.api.open(); }, 1000);

        vm.openLogin = () => stateService.set('modalLogin', true);

        vm.saveToPalette = color => {
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

        vm.clearEntirePalette = () => {
            $localForage.setItem('palette', [])
                .then(() => {
                    $localForage.getItem('palette')
                        .then(colors => {
                            if(colors) {
                                vm.palette = colors;
                            } else {
                                vm.palette = [];
                            }
                        });
                });
        };

        $localForage.getItem('palette')
            .then(colors => {
                if(colors) console.log('eee', colors); vm.palette = colors;
            });
    }
})();
