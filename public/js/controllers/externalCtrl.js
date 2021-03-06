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
            $scope.logged = stateService.get('logged');
            $scope.bgEntire = stateService.get('bgEntire');
            $scope.bgTop = stateService.get('bgTop');
            $scope.bgBottom = stateService.get('bgBottom');
        });

        $localForage.getItem('authorization')
            .then(authData => {
                if(authData && authData.logged) stateService.set('logged', true);
            });

        $rootScope.$on('user::auth', () => {
            $localForage.getItem('authorization')
                .then(authData => {
                    if(authData && authData.logged) {
                        stateService.set('logged', true);
                    } else {
                        stateService.set('logged', false);
                    }
                });
        });
    }

})();