(function () {
    'use strict';

    angular
        .module('app')
        .service('colorChangerService', Service);

    //$inject for minify issue
    Service.$inject = ['$rootScope'];

    function Service($rootScope) {
        this.colorChange = {
            fromHEX: {
                toHSL: function(hex) {
                    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

                    var r = parseInt(result[1], 16);
                    var g = parseInt(result[2], 16);
                    var b = parseInt(result[3], 16);
                    r /= 255, g /= 255, b /= 255;
                    var max = Math.max(r, g, b), min = Math.min(r, g, b);
                    var h, s, l = (max + min) / 2;
                    if(max == min){
                        h = s = 0; // achromatic
                    } else {
                        var d = max - min;
                        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                        switch(max){
                            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                            case g: h = (b - r) / d + 2; break;
                            case b: h = (r - g) / d + 4; break;
                        }
                        h /= 6;
                    }
                    console.log(h);
                    console.log(s);
                    console.log(l);
                },
                toRGB: function(hex) {
                    var bigint = parseInt(hex, 16);
                    var r = (bigint >> 16) & 255;
                    var g = (bigint >> 8) & 255;
                    var b = bigint & 255;

                    //console.log(r);
                    //console.log(g);
                    //console.log(b);
                },
                prepareAndExecute: function(color_field) {
                    // preparing
                    var hex = color_field.replace(/[^0-9A-F]/gi, '');
                    this.toRGB(hex);
                    this.toHSL(hex);
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

                    var colorInHSL = 'hsl(' + h + ', ' + s + ', ' + l + ')';

                    $rootScope.$emit('colorChanged', colorInHSL);

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
                        $rootScope.$emit('colorChanged', colorInHEX);
                    }
                },
                prepareAndExecute: function(color_field) {
                    // preparing
                    var numbers = color_field.match(/\d+/g);
                    if(numbers.length == 3) {
                        this.toHSL(+numbers[0], +numbers[1], +numbers[2]);
                        this.toHEX.convert(+numbers[0], +numbers[1], +numbers[2]);
                    } else {
                        alert('wrong RGB number format');
                    }
                }
            }
        }
    }
})();
