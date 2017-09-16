(function () {
    'use strict';

    angular
        .module('app')
        .service('colorChangerService', Service);

    //$inject for minify issue
    Service.$inject = [];

    function Service() {
        this.colorChange = {
            fromHEX: {
                toHSL: function() {

                },
                toRGB: function() {

                },
                prepareAndExecute: function(color_field) {
                    // preparing

                    //this.toRGB(preparedValue);
                    //this.toHSL(preparedValue);
                }
            },
            fromRGB: {
                toHSL: function(r, g, b) {

                },
                toHEX: {
                    supportFunc: function(number) {
                        var hex = number.toString(16);
                        return hex.length == 1 ? '0' + hex : hex;
                    },
                    convert: function(r, g, b) {
                        var colorInHEX = '#' + this.supportFunc(r) + this.supportFunc(g) + this.supportFunc(b);
                        console.log(colorInHEX);
                    }
                },
                prepareAndExecute: function(color_field) {
                    // preparing
                    var numbers = color_field.match(/\d+/g);
                    if(numbers.length == 3) {
                        this.toHEX.convert(+numbers[0], +numbers[1], +numbers[2]);
                        this.toHSL(+numbers[0], +numbers[1], +numbers[2]);
                    } else {
                        alert('wrong RGB number format');
                    }
                }
            }
        }
    }
})();
