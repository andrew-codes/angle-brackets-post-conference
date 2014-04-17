(function () {
    'use strict';

    var controllerId = 'customerOrder';

    angular.module('app').controller(controllerId,
        ['$location', '$routeParams', 'common', 'zzaRepository', customerOrder]);

    function customerOrder($location, $routeParams, common, zzaRepository) {
        var vm = this;
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);
        var logError = getLogFn(controllerId, "error");
        var order = null;

        vm.title = 'customerOrder';
        vm.orderItems = [];
        vm.products = [];
        vm.addToOrder = addToOrder;
        vm.submitOrder = submitOrder;

        activate();
        function activate() {
            common.activateController([loadProducts()], controllerId).then(function () { log('Activated Current Order View'); });
        }

        function submitOrder() {
            zzaRepository.saveOrder(order).then(function () {
                order = null;
                vm.orderItems = [];
                log("Order placed!")
                $location.url('/');
            },function (error) {
                logError(error.message, "Error saving order");
                });

        }

        function addToOrder(product) {
            var custId = $routeParams.customerId;
            if (!order)
                order = zzaRepository.createNewOrder(custId);
            var orderItem = order.entityAspect.entityManager.createEntity("OrderItem");
            orderItem.order =order;
            orderItem.product = product;
            orderItem.productSizeId = 1;
            vm.orderItems.push(orderItem);
        }

        function loadProducts() {
            return zzaRepository.getProducts().then(function (data) {
                vm.products = data.results;
            });
        }
    }
})();
