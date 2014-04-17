/// <reference path="../../Scripts/jquery-1.9.1.js" />
/// <reference path="../../Scripts/knockout-2.3.0.debug.js" />

var shellViewModel = (function () {
    var customers = ko.observableArray([]),
        activate = function () {
            $.getJSON("api/Customers").done(function (data) {
                shellViewModel.customers(data);
            });
        };
    activate();
    return {
        customers: customers
    };
}());
ko.applyBindings(shellViewModel);