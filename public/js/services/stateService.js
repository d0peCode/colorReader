(function () {
    'use strict';

    angular
        .module('app')
        .service('stateService', Service);

    function Service() {
        this.state = {
            modalLogin: false,
            modalRegister: false,
            logged: false,
            bgEntire: '',
            bgTop: '',
            bgBottom: ''
        };
        this.set = (property, value) => {
            this.state[property] = value;
        }
        this.get = (property) => {
            return this.state[property];
        }
    }
})();