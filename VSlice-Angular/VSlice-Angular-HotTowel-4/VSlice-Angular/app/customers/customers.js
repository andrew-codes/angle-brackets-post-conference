(function () {
    'use strict';

    var controllerId = 'customers';

    angular.module('app').controller(controllerId,
        ['$http', 'common', customers]);

    function customers($http, common) {
        var vm = this;
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);
        vm.title = 'customers';
        vm.customers = [];

        activate();
        function activate() {
            loadCustomers();
            common.activateController([], controllerId)
                .then(function () { log('Activated Customers View'); });

        }

        function loadCustomers() {
            return $http.get('/api/Customers').success(function (data) {
                vm.customers = data;
            });
            //var custs = [
            //    { id: 1, name: 'Fred', phone: '999-999-0000' },
            //    { id: 2, name: 'Wilma', phone: '555-555-5555' }
            //];
            //$scope.customers = custs;
        }
    }
})();
