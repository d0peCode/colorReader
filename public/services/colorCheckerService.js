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
                        if(numbers[0] > 255 || numbers[0] < 0 || numbers[1] > 255 || numbers[1] < 0 || numbers[2] > 255 || numbers[2] < 0) {
                            alert('numbers in rgb format must be in 0-255 range');
                        } else {
                            colorChangerService.colorChange.fromRGB.prepareAndExecute(numbers);
                        }
                    } else {
                        alert('rgb format must contains 3 numbers');
                        console.log(numbers.length);
                        console.log(numbers);
                    }

                    break;
                case '#':
                    console.log('its probably HEX');
                    var checkLength = color_field.split('');
                    if(checkLength.length === 7 || checkLength.length === 4) {
                        colorChangerService.colorChange.fromHEX.prepareAndExecute(color_field);
                    } else {
                        alert('color in HEX format must have # before and 3 or 6 numbers');
                    }

                    break;
                case 'h':
                    console.log('its probably HSL');
                    var checkProcentage = color_field;
                    checkProcentage = checkProcentage.match(/([%])/g);
                    if(checkProcentage && checkProcentage.length === 2) {
                        var numbers = color_field;
                        numbers = numbers.match(/[+-]?\d+(\.\d+)?/g).map(parseFloat);
                        if(numbers.length === 3) {
                            if(numbers[0] > 359 || numbers[0] < 0) {
                                alert('first HSL number must be in 0 - 359 range');
                            } else {
                                if(numbers[1] < 0 || numbers[1] > 100 || numbers[2] < 0 || numbers[2] > 100) {
                                    alert('second and third numbers must be in 0-100 range');
                                } else {
                                    colorChangerService.colorChange.fromHSL.prepareAndExecute(numbers);
                                }
                            }
                        } else {
                            alert('HSL must contains 3 numbers');
                            console.log(numbers.length);
                            console.log(numbers);
                        }
                    } else {
                        alert('HSL format must contains two % after second and third number!');
                    }

                    break;
                default:
                    alert('wrong color, use RGB (ex. rgb(22, 22, 22)) or HSL (ex. rgb(22, 22%, 22%)) or HEX (ex. #222 || #222222)')
            }
        }
    }
})();
