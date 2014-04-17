(function () {
    'use strict';

    var controllerId = 'customers';

    angular.module('vslice').controller(controllerId,
        ['$http', customers]);

    function customers($http) {
        var vm = this;
        vm.title = 'customers';
        vm.customers = [];

        activate();
        function activate() {
            loadCustomers();
        }

        function loadCustomers() {
            $http.get('/api/Customers').success(function (data) {
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
