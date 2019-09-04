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

        $localForage.getItem('authorization')
            .then((authData) => { stateService.set('logged', authData) });

        $rootScope.$on('user::auth', () => {
            $localForage.getItem('authorization')
                .then((authData) => { stateService.set('logged', authData) });
        });
    }

})();