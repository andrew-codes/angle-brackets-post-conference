

app.em = new breeze.EntityManager("breeze/Zza");

app.zzaDataRepository = function () {

    var getAllProducts = function () {
        var custquery = breeze.EntityQuery.from("Customers").take(1);
        app.em.executeQuery(custquery).then(function (data) { customer(data.results[0]); });
        var statusQuery = breeze.EntityQuery.from("OrderStatuses");
        app.em.executeQuery(statusQuery).then(function (data) { statuses(data.results); });
        var query = new breeze.EntityQuery("Products");
        return app.em.executeQuery(query);
    },
        getProductsByType = function (type) {
            var query = breeze.EntityQuery.from("Products").where("Type", "equals", type);
            return app.em.executeQuery(query);
        },
        getOrderHistory = function (customerId) {
            var query = breeze.EntityQuery.from("Orders").where("CustomerId", "equals", customerId);
            return app.em.executeQuery(query);
        },
        getCurrentOrder = function () {
            if (!currentOrder) {
                currentOrder = app.em.createEntity("Order");
                currentOrder.Customer(customer());
                currentOrder.OrderStatusId(1);
            }
            return currentOrder;
        },
        currentOrder,
        saveChanges = function () {
            return app.em.saveChanges();
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
}();