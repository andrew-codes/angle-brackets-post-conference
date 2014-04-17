/// <reference path="../jquery-2.0.3.js" />
/// <reference path="../knockout-2.3.0.js"/>
/// <reference path="../moment.js" />
/// <reference path="../breeze.debug.js" />
/// <reference path="../bootstrap.js" />
/// <reference path="logger.js" />
/// 

var app = app || {};

app.customersViewModel = (function (zzaDataService, logger) {
    var customers = ko.observableArray([]),
        editingCustomer = ko.observable(''),
        addingCustomer = ko.observable(''),
        load = function () {
            zzaDataService.getCustomers().then(customersLoaded).fail(errorLoading);
        },
        customersLoaded = function (data) {
            customers(data.results);
        },
        editCustomer = function (customer) {
            editingCustomer(customer);
            $("#editCustomerModal").modal();
        },
        saveEdit = function () {
            $("#editCustomerModal").modal("hide");
        },
        cancelEdit = function () {
            editingCustomer().entityAspect.rejectChanges();
            $("#editCustomerModal").modal("hide");
        },
        addCustomer = function () {
            addingCustomer(zzaDataService.newCustomer());
            $("#addCustomerModal").modal();
        },
        saveAdd = function () {
            customers.push(addingCustomer());
            addingCustomer('');
            $("#addCustomerModal").modal("hide");
        },
        cancelAdd = function () {
            addingCustomer().entityAspect.rejectChanges();
            addingCustomer('');
            $("#addCustomerModal").modal('hide');
        },
        deleteCustomer = function (customer) {
            customer.entityAspect.setDeleted();
            customers.remove(customer);
        },
        saveChangesToServer = function () {
            zzaDataService.saveCustomers().fail(function (error) {
                logger.error(error.message, "Failure saving customers");
            });
            //zzaDataService.saveChangesToServer();
        },
        rejectChanges = function () {
            zzaDataService.rejectChanges();
        },
        acceptChanges = function () {
            zzaDataService.acceptChanges();
        },
        errorLoading = function (error) {
            logger.error(error.message, "Loading customers failed");
        },
        placeOrderForCustomer = function (customer) {
            //placingOrder(true);
        };
    return {
        customers: customers,
        load: load,
        editCustomer: editCustomer,
        saveEdit: saveEdit,
        editingCustomer: editingCustomer,
        addingCustomer: addingCustomer,
        cancelEdit: cancelEdit,
        addCustomer: addCustomer,
        saveAdd: saveAdd,
        cancelAdd: cancelAdd,
        deleteCustomer: deleteCustomer,
        saveChangesToServer: saveChangesToServer,
        rejectChanges: rejectChanges,
        acceptChanges: acceptChanges,
        placeOrderForCustomer: placeOrderForCustomer
    };


}(app.zzaDataService, app.logger));

