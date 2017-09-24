(function () {
    'use strict';

    angular
        .module('app')
        .service('colorCheckerService', Service);

    //$inject for minify issue
    Service.$inject = ['colorChangerService'];

    function Service(colorChangerService) {
        this.colorCheck = function(color_field) {
            console.log('im working colorCheck function in service');
            switch (color_field.charAt(0)) {
                case 'r':
                    //its probably fromRGB
                    var numbers = color_field.match(/\d+/g);
                    if(numbers.length === 3) {
                        colorChangerService.colorChange.fromRGB.prepareAndExecute(numbers);
                    } else {
                        alert('its wrong rgb format');
                        console.log(numbers.length);
                        console.log(numbers);
                    }

                    break;
                case '#':
                    console.log('its probably HEX');
                    var checkLength = color_field.split('');
                    if(checkLength.length === 7) {
                        colorChangerService.colorChange.fromHEX.prepareAndExecute(color_field);
                    } else {
                        alert('color in HEX format must have 7 sign');
                    }

                    break;
                case 'h':
                    console.log('its probably HSL');
                    var numbers = color_field;
                    numbers = numbers.match(/[+-]?\d+(\.\d+)?/g).map(parseFloat);
                    if(numbers.length === 3) {
                        colorChangerService.colorChange.fromHSL.prepareAndExecute(numbers);
                    } else {
                        alert('its wrong hsl format');
                        console.log(numbers.length);
                        console.log(numbers);
                    }
                    break;
                default:
                    alert('wrong color')
            }
        }
    }
})();
