/// <reference path="../jquery-2.0.3.js" />
/// <reference path="../knockout-2.3.0.js"/>
/// <reference path="../moment.js" />
/// <reference path="../breeze.debug.js" />
/// <reference path="../bootstrap.js" />
/// <reference path="logger.js" />
/// 
var app = app || {};

app.homeViewModel = (function (customersViewModel, orderViewModel) {
    var placingOrder = ko.observable(false),
        load = function () {
            customersViewModel.load();
            orderViewModel.load();
            customersViewModel.homeViewModel = this;
            orderViewModel.homeViewModel(this);
        },
        showOrderView = function (customer) {
            orderViewModel.customer(customer);
            placingOrder(true);
        },
        showCustomerList = function () {
            placingOrder(false);
        };

    return {
        load: load,
        placingOrder: placingOrder,
        showOrderView: showOrderView,
        customersViewModel: customersViewModel,
        orderViewModel: orderViewModel,
        showCustomerList: showCustomerList
    };
}(app.customersViewModel, app.orderViewModel));

app.homeViewModel.load();
ko.applyBindings(app.homeViewModel);


