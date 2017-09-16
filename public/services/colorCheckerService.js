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
                    console.log('its RGB');
                    colorChangerService.colorChange.fromRGB.prepareAndExecute(color_field);
                    break;
                case '#':
                    console.log('its HEX');
                    colorChangerService.colorChange.fromHEX.prepareAndExecute(color_field);
                    break;
                case 'h':
                    console.log('its HSL')
                    break;
                default:
                    alert('wrong color')
            }
        }
    }
})();
