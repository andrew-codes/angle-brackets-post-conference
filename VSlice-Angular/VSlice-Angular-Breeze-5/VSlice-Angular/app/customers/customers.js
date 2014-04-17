(function () {
    'use strict';

    var controllerId = 'customers';

    angular.module('app').controller(controllerId,
        ['$http', '$location', 'common', 'zzaRepository', customers]);

    function customers($http, $location, common, zzaRepository) {
        var vm = this;
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);
        vm.title = 'customers';
        vm.customers = [];
        vm.placeOrder = placeOrder;

        activate();
        function activate() {
            common.activateController([loadCustomers()], controllerId)
                .then(function () { log('Activated Customers View'); });

        }

        function loadCustomers() {
            return zzaRepository.getCustomers().then(function (data) {
                vm.customers = data.results;
            });
            //return $http.get('/api/Customers').success(function (data) {
            //    vm.customers = data;
            //});
        }
        function placeOrder(customerId) {
            $location.url('/currentOrder/' + customerId);
        }
    }
})();
