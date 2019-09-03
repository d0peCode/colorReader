(function () {
    'use strict';

    angular
        .module('app')
        .controller('external', Controller);

    Controller.$inject = ['$scope', '$rootScope', '$localForage', 'stateService'];

    function Controller($scope, $rootScope, $localForage, stateService) {
        $scope.$watch(() => {
            $scope.modalLogin = stateService.get('modalLogin');
            $scope.modalRegister = stateService.get('modalRegister');
        });

        //this execute after every page refresh
        $localForage.getItem('authorization')
            .then(function (authData) {
                    if (authData) {
                        $scope.auth = true;
                    } else {
                        $scope.auth = false;
                    }
                }, function () {
                    console.log("error with getting authorization localForage after refresh");
                }
            );

        //this execute after custom event emitted after success login response
        $rootScope.$on('authChange', function (event) {
            $localForage.getItem('authorization')
                .then(function (authData) {
                        if (authData) {
                            $scope.auth = true;
                            console.log('logged');
                        } else {
                            $scope.auth = false;
                            $location.path('/');
                        }
                    }, function () {
                        console.log("error with getting authorization localForage on event");
                    }
                );
        });
    }

})();