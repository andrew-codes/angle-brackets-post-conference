define(function () {

    var em = new breeze.EntityManager("breeze/Zza"),
     getAllProducts = function () {
         custquery = breeze.EntityQuery.from("Customers").take(1);
         em.executeQuery(custquery).then(function (data) { customer(data.results[0]); });
         var statusQuery = breeze.EntityQuery.from("OrderStatuses");
         em.executeQuery(statusQuery).then(function (data) { statuses(data.results); });
         var query = new breeze.EntityQuery("Products");
         return em.executeQuery(query);
     },
        getProductsByType = function (type) {
            var query = breeze.EntityQuery.from("Products").where("Type", "equals", type);
            return em.executeQuery(query);
        },
        getOrderHistory = function (customerId) {
            var query = breeze.EntityQuery.from("Orders").where("CustomerId", "equals", customerId);
            return em.executeQuery(query);
        },
        getCurrentOrder = function () {
            if (!currentOrder) {
                currentOrder = em.createEntity("Order");
                currentOrder.Customer(customer());
                currentOrder.OrderStatusId(1);
            }
            return currentOrder;
        },
        currentOrder,
        saveChanges = function () {
            var promise = em.saveChanges();
            promise.then(function () { currentOrder = null; });
            return promise;
        },
        customer = ko.observable(''),
        statuses = ko.observableArray([]);


    return {
        getAllProducts: getAllProducts,
        getProductsByType: getProductsByType,
        getOrderHistory: getOrderHistory,
        getCurrentOrder: getCurrentOrder,
        saveChanges: saveChanges,
    }
});