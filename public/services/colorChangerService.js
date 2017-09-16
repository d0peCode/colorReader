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

                }
            }
        }
    }
})();
