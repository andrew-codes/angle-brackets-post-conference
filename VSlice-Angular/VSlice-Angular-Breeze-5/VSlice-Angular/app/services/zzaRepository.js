/// <reference path="C:\Demos\SPA Workshop\VSlice-Angular\VSlice-Angular-Breeze-5\VSlice-Angular\Scripts/breeze.debug.js" />
(function () {
    'use strict';

    var serviceId = 'zzaRepository';

    // TODO: replace app with your module name
    angular.module('app').factory(serviceId, ['common', zzaRepository]);

    function zzaRepository(common) {
        // Define the functions and properties to reveal.
        var em = new breeze.EntityManager('/breeze/Zza');
        var getLogFn = common.logger.getLogFn;
        var logError = getLogFn(serviceId, "error");

        var service = {
            getCustomers: getCustomers,
            getProducts: getProducts,
            createNewOrder: createNewOrder,
            saveOrder: saveOrder
        };
        populateLookups();

        return service;

        function getCustomers() {
            var query = breeze.EntityQuery.from("Customers");
            return em.executeQuery(query);
        }

        function getProducts() {
            var query = breeze.EntityQuery.from("Products");
            return em.executeQuery(query);
        }

        function createOrderItem(orderId, productId) {
            var orderItem = em.createEntity("OrderItem");
            orderItem.orderId = orderId;
            orderItem.productId = productId;
            return orderItem;
        }

        function createNewOrder(customerId) {
            var order = em.createEntity("Order");
            order.orderDate = Date.now();
            order.customerId = customerId;
            var pendingStatus = em.executeQueryLocally(breeze.EntityQuery.from("OrderStatuses").where("name", "equals", "Pending"))[0];
            order.orderStatusId = pendingStatus.id;
            return order;
        };
        function populateLookups() {
            var query = breeze.EntityQuery.from("Lookups");
            return em.executeQuery(query).catch(errorHandler);
        };

        function errorHandler(error) {
            logError(error.message, "Error executing query");
        };

        function saveCustomers() {
            var customers = em.getChanges("Customer");
            return em.saveChanges(customers);
        };

        function saveOrder(order) {
            var saveOptions = new breeze.SaveOptions({ resourceName: "SaveOrder" });
            var orders = [order];
            return em.saveChanges(orders, saveOptions);
        };


        //#region Internal Methods        

        //#endregion
    }
})();