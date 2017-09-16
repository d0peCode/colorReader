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
