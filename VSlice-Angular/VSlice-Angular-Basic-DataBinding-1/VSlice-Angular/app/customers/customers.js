(function () {
    'use strict';

    var controllerId = 'customers';

    angular.module('vslice').controller(controllerId,
        ['$scope', customers]);

    function customers($scope) {
        $scope.title = 'customers';

        activate();
        function activate() {
            loadCustomers();
        }

        function loadCustomers() {
            var custs = [
                { id: 1, name: 'Fred', phone: '999-999-0000' },
                { id: 2, name: 'Wilma', phone: '555-555-5555' }
            ];
            $scope.customers = custs;
        }
    }
})();
