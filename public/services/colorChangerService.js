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
                    r /= 255, g /= 255, b /= 255;
                    var max = Math.max(r, g, b), min = Math.min(r, g, b);
                    var h, s, l = (max + min) / 2;

                    if(max == min){
                        h = s = 0; // achromatic
                    } else {
                        var d = (max - min);
                        s = l >= 0.5 ? d / (2 - (max + min)) : d / (max + min);
                        switch (max) {
                            case r:
                                h = ((g - b) / d + 0)*60;
                                break;
                            case g:
                                h = ((b - r) / d + 2)*60;
                                break;
                            case b:
                                h = ((r - g) / d + 4)*60;
                                break;
                            }
                    }

                    console.log('Hue = '+h);
                    console.log('Saturation = '+s);
                    console.log('Lightness = '+l);

                    return [h, s, l];
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
