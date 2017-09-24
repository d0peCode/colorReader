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

                    var colorInHSL = 'hsl(' + h + ', ' + s + ', ' + l + ')';
                    $rootScope.$emit('colorChanged', colorInHSL);
                },
                toRGB: function(hex) {
                    var bigint = parseInt(hex, 16);
                    var r = (bigint >> 16) & 255;
                    var g = (bigint >> 8) & 255;
                    var b = bigint & 255;

                    var colorInRGB = 'rgb(' + r + ', ' + g + ', ' + b +')';
                    $rootScope.$emit('colorChanged', colorInRGB);
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
                        $rootScope.$emit('colorChanged', colorInHEX);
                    }
                },
                prepareAndExecute: function(color_field) {
                    // preparing
                    var numbers = [];
                    numbers = color_field;
                    this.toHSL(+numbers[0], +numbers[1], +numbers[2]);
                    this.toHEX.convert(+numbers[0], +numbers[1], +numbers[2]);
                }
            },
            fromHSL: {
                toHEX: function(h, s, l) {
                    h /= 360;
                    s /= 100;
                    l /= 100;
                    var r = void 0,
                        g = void 0,
                        b = void 0;
                    if (s === 0) {
                        r = g = b = l; // achromatic
                    } else {
                        var hue2rgb = function hue2rgb(p, q, t) {
                            if (t < 0) t += 1;
                            if (t > 1) t -= 1;
                            if (t < 1 / 6) return p + (q - p) * 6 * t;
                            if (t < 1 / 2) return q;
                            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                            return p;
                        };
                        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                        var p = 2 * l - q;
                        r = hue2rgb(p, q, h + 1 / 3);
                        g = hue2rgb(p, q, h);
                        b = hue2rgb(p, q, h - 1 / 3);
                    }
                    var toHex = function toHex(x) {
                        var hex = Math.round(x * 255).toString(16);
                        return hex.length === 1 ? '0' + hex : hex;
                    };
                    console.log('#' + toHex(r) + toHex(g) + toHex(b));

                },
                toRGB: function(h, s, l) {
                    var r, g, b;

                    if (s == 0) {
                        r = g = b = l; // achromatic
                    } else {
                        var hue2rgb = function hue2rgb(p, q, t) {
                            if (t < 0) t += 1;
                            if (t > 1) t -= 1;
                            if (t < 1 / 6) return p + (q - p) * 6 * t;
                            if (t < 1 / 2) return q;
                            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                            return p;
                        };

                        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                        var p = 2 * l - q;
                        r = hue2rgb(p, q, h + 1 / 3);
                        g = hue2rgb(p, q, h);
                        b = hue2rgb(p, q, h - 1 / 3);
                    }

                    console.log(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255));
                },
                prepareAndExecute: function(numbers) {
                    this.toHEX(+numbers[0], +numbers[1], +numbers[2]);
                    this.toRGB(+numbers[0], +numbers[1], +numbers[2]);
                }
            }
        }
    }
})();
