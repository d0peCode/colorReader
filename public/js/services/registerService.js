(function () {
    'use strict';

    angular
        .module('accTrader')
        .service('registerService', Service);

    Service.$inject = ['$http'];

    function Service($http) {
        this.registerUser = function (registerInfo) {

            return $http({
                url: 'https://acctrader.herokuapp.com/v1/sign_up',
                headers: {
                    'Content-Type': 'application/vnd.api+json'
                },
                method: 'POST',
                data: {
                    user: {
                        email: registerInfo.email,
                        nick: registerInfo.nick,
                        password: registerInfo.password,
                        password_confirmation: registerInfo.password_confirmation
                    }
                }
            })
            .then(function(response) {
                return response.data;
            }, function(err) {
                return err;
            });
        };
    }
})();
