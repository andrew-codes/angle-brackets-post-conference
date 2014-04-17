/// <reference path="../../Scripts/jquery-1.9.1.js" />
/// <reference path="../../Scripts/knockout-2.3.0.debug.js" />

var shellViewModel = (function () {
    var currentTemplate = ko.observable('customersList'),
        customers = ko.observableArray([]),
        placeOrder = function (customer) {
            currentTemplate('placeOrder');
        },
        orderComplete = function () {
            currentTemplate('customersList');
        },
        activate = function () {
            $.getJSON("api/Customers").done(function (data) {
                shellViewModel.customers(data);
            });
        };
    activate();
    return {
        currentTemplate: currentTemplate,
        customers: customers,
        placeOrder: placeOrder,
        orderComplete: orderComplete
    };
}());
ko.applyBindings(shellViewModel);