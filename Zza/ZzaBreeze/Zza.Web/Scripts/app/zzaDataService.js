/// <reference path="../breeze.debug.js" />

app.zzaDataService = (function (logger) {
    var serviceAddress = "breeze/zza",
        em = new breeze.EntityManager(serviceAddress),
        getCustomers = function () {
            var query = new breeze.EntityQuery("Customers");
            return em.executeQuery(query);
        },
        getProducts = function () {
            var query = new breeze.EntityQuery("Products");
            return em.executeQuery(query);
        },
        saveChangesToServer = function () {
            return em.saveChanges();
        },
        newCustomer = function () {
            var cust = em.createEntity("Customer", { id: breeze.core.getUuid() });
            return cust;
        },
        rejectChanges = function () {
            em.rejectChanges();
        },
        // Generally don't do this is production apps
        // Sets the state of all entities to unchanged even if they are
        // Which makes it so Breeze is unable to persist the changes to the 
        // server side
        acceptChanges = function () {
            var changedCustomers = em.getChanges("Customer");
            for (var i = 0; i < changedCustomers.length; i++)
            {
                changedCustomers[i].entityAspect.acceptChanges();
            }
        },
        createNewOrder = function (customer) {
            var order = em.createEntity("Order");
            order.customer(customer);
            var pendingStatus = em.executeQueryLocally(breeze.EntityQuery.from("OrderStatuses").where("name", "equals", "Pending"))[0];
            order.orderStatusId(pendingStatus.id());
            return order;
        },
        populateLookups = function () {
            var query = breeze.EntityQuery.from("Lookups");
            em.executeQuery(query).fail(errorHandler);
        },
        errorHandler = function (error) {
            logger.error(error.message, "Error executing query");
        },
        saveCustomers = function () {
            var customers = em.getChanges("Customer");
            return em.saveChanges(customers);
        },
        saveOrder = function (order) {
            var saveOptions = new breeze.SaveOptions({ resourceName: "SaveOrder" });
            var orders = [order];
            return em.saveChanges(orders, saveOptions);
        };
    return {
        getCustomers: getCustomers,
        getProducts: getProducts,
        saveChangesToServer: saveChangesToServer,
        newCustomer: newCustomer,
        rejectChanges: rejectChanges,
        acceptChanges: acceptChanges,
        createNewOrder: createNewOrder,
        populateLookups: populateLookups,
        saveCustomers: saveCustomers,
        saveOrder: saveOrder
    };
})(app.logger);

app.zzaDataService.populateLookups();