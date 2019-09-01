(function () {
    'use strict';

    angular
        .module('traderSpy')
        .service('authService', Service);

    Service.$inject = ['$http', '$localForage', '$rootScope'];

    function Service($http, $localForage, $rootScope) {

        this.login = function (loginData) {

            var user = {
                "user": {
                    "name": loginData.name,
                    "password": loginData.password
                }
            };

            return $http({
                url: 'https://trade.rzessski.cloud/api/public/signin',
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                data: user
            })
            .then(function(response) {
                console.log(response);
                if(response) {
                    if (response.data.data.attributes.token) {
                        return $localForage.setItem('authorization', {
                            token: response.data.data.attributes.token
                        })
                        .then(function () {
                            $rootScope.$emit('authChange');
                            console.log('emitted');
                            return response;
                        })
                        .catch(function () {
                            console.log('error while setting authorization token to localforage');
                            return false;
                        });
                    } else {
                        console.log("token doesn't exist in sign_in response");
                    }
                } else {
                    return response;
                }
            }, function (err) {
                console.log("err:");
                console.log(err);
                return err;
            });
        };

        this.logout = function() {

            $http({
                url: 'https://trade.rzessski.cloud/api/public/signout',
                method: 'DELETE'
            })
            .then(function() {
                console.log("deleted session");
                $localForage.clear()
                    .then(function() {
                        $rootScope.$emit('authChange');
                        // async emit event to execute async function in external controller
                    });
            },function() {
                alert("error deleting session");
            });
        };
    }
})();